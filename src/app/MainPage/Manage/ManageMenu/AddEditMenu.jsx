import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
import DataService from "../../../EntryFile/Services/DataService";
import Inputs from "../../../components/forms/inputs";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";
import IconMap from "../../../components/iconMap/IconMap";

const validator = {
  require: { required: true, message: "Required" },
};

const AddEditMenu = forwardRef(({ initialValues, dataSource }, ref) => {
  const dataS = new DataService('Categories');
  const [form] = Form.useForm();

  // Expose the formSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    formSubmit: async () => {
      try {
        const formValues = await validateForm();
        const isUpdate = await Object.keys(initialValues).length > 0; // Check if initialValues exist
  
        let tempData = {
          name: formValues.category_name,
          description: formValues.category_description,
          type: window.location.href.includes("inventory-") ? "inventory" : "menu", //set category type based on route
          created_at: isUpdate ? initialValues.created_at : new Date(),
          created_by: isUpdate ? initialValues.created_by : 'admin',
          updated_at: isUpdate ? new Date() : null,
          updated_by: isUpdate ? 'admin' : null,
        };
  
        return { success: true, data: tempData }; // Return validation success and form data
      } catch (error) {
        console.error('Form validation error:', error);
        return { success: false, error }; // Return validation failure and error
      }
    },
  }));

  const validateForm = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      throw error;
    }
  };
  
  useEffect(() => {
    form.resetFields();
    console.log('initialValues :::: ', initialValues);
    if (initialValues) {
      form.setFieldsValue({
        category_name: initialValues.name,
        category_description: initialValues.description,
      });
    }
  }, [initialValues, form]);  

  return (
    <>
      <Form 
        size="large" 
        name="user_login" 
        className="row ogin-form" 
        layout="vertical" 
        form={form}
        >
        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="category_name" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Category Name" placeholder="Enter Category Name" name="category_name" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="price_hot">
              <Inputs type="price" label="Price(Hot)" prefix={IconMap('FaTemperatureHigh','text-danger',null,20)} placeholder="Enter price for hot drink" name="price_hot" />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="price_cold">
              <Inputs type="price" label="Price(Cold)" prefix={IconMap('FaTemperatureLow','text-primary',null,20)} placeholder="Enter price (Hot) for cold drink" name="price_cold" />
          </Form.Item>
        </div>
        <div className="col-12">
          <Form.Item name="category_description" rules={[validator.require]} hasFeedback>
            <Inputs type="text-area" label="Description" placeholder="Input category description here" name="category_description" required={true} rows={6} />
          </Form.Item>
        </div>
      </Form>
      {/* <FrenchPressLoader/> */}
    </>
    
  );

});

export default AddEditMenu;
