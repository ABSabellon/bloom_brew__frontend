import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
import { Switch } from "antd";
import Inputs from "../../../components/forms/inputs";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";

const validator = {
  require: { required: true, message: "Required" },
};

const AddEditCategory = forwardRef(({ initialValues, dataSource }, ref) => {
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
          has_temp:formValues.has_temp? true:false,
          type: window.location.href.includes("inventory-") ? "inventory" : "menu", //set category type based on route
          created_at: isUpdate ? initialValues.created_at : new Date(),
          created_by: isUpdate ? initialValues.created_by : 'admin',
          updated_at: isUpdate ? new Date() : null,
          updated_by: isUpdate ? 'admin' : null,
        };

        // console.log('tempData :::', tempData)
  
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
    if (initialValues) {
      form.setFieldsValue({
        category_name: initialValues.name,
        category_description: initialValues.description,
        has_temp:initialValues.has_temp
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
         
         <div className="col-lg-4 col-sm-6 col-12 d-none d-lg-block"></div>

        <div className="col-lg-4 col-sm-6 col-12" style={{display:'flex', alignItems:'center',justifyContent:'flex-end'}}>   
          <span style={{ marginBottom: '24px',marginRight:'10px'}}>Requires temperature: </span>
          <Form.Item name="has_temp" valuePropName="checked" >
            <Switch />
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

export default AddEditCategory;
