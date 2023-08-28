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

const AddEditMenu = forwardRef(({ initialValues, dataSource, categoryOption }, ref) => {
  console.log('categoryOption :::: ', categoryOption)
  const [form] = Form.useForm();

  const categoryValidator = () => ({
    validator(_, value) {
      if (categoryOption.some(option => option.value === value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Invalid category selected."));
    },
  });

  useImperativeHandle(ref, () => ({
    formSubmit: async () => {
      try {
        const formValues = await validateForm();
        const isUpdate = await Object.keys(initialValues).length > 0; // Check if initialValues exist
        
        const selectedCategory = categoryOption.find(option => option.value === formValues.menu_category);
    
        let tempData = {
          name: formValues.menu_name,
          allergens: formValues.menu_allergens,
          category_id:selectedCategory,
          details:[
            {hot:price_hot? true:false, price: price_hot? price_hot:null},
            {cold:price_cold? true:false, price: price_cold? price_cold:null},
          ],
          // type: window.location.href.includes("inventory-") ? "inventory" : "menu", //set category type based on route
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
          <Form.Item name="menu_name" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Product Name" placeholder="Enter Product Name" name="menu_name" required={true} />
          </Form.Item>
        </div>

        {/* <div className="col-lg-4 col-sm-6 col-12 d-none d-lg-block"></div> */}

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="menu_category" rules={[validator.require,categoryValidator]} hasFeedback>
            <Inputs type="autocomplete" label="Category Name" placeholder="Enter Category Name" name="menu_category" option={categoryOption} required={true} />
          </Form.Item>
        </div>

        <div className="col-12">
          <Form.Item name="menu_allergens" rules={[validator.require]} hasFeedback>
            <Inputs type="text-area" label="Description" placeholder="Enter allergens here" name="menu_allergens" required={true} rows={6} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="price_hot">
              <Inputs type="price" label="Price(Hot)" prefix={IconMap('FaTemperatureHigh','text-danger',null,20)} placeholder="Enter price for hot drink" name="price_hot" />
          </Form.Item>
        </div>

        {/* <div className="col-lg-4 col-sm-6 col-12 d-none d-lg-block"></div> */}

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="price_cold">
              <Inputs type="price" label="Price(Cold)" prefix={IconMap('FaTemperatureLow','text-primary',null,20)} placeholder="Enter price (Hot) for cold drink" name="price_cold" />
          </Form.Item>
        </div>
      </Form>
      {/* <FrenchPressLoader/> */}
    </>
    
  );

});

export default AddEditMenu;
