import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
import { Switch } from "antd";
import Inputs from "../../../../components/forms/inputs";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";

const validator = {
  require: { required: true, message: "Required" },
  email: { type: 'email', message: 'Invalid email format' }
};

const AddEditSupplier = forwardRef(({ initialValues, dataSource, isUpdate }, ref) => {
  const [form] = Form.useForm();

  // Expose the formSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    formSubmit: async () => {
      try {
        const formValues = await validateForm();

        let tempData = {
          company_name: formValues.supplier_company,
          rep_name: formValues.supplier_rep,
          phone:formValues.supplier_phone,
          email:formValues.supplier_email,
          address:formValues.supplier_address,
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
    if (isUpdate) {
      form.setFieldsValue({
        supplier_company: initialValues.company_name,
        supplier_rep: initialValues.rep_name,
        supplier_phone: initialValues.phone,
        supplier_email: initialValues.email,
        supplier_address: initialValues.address,
      });
    }
  }, [initialValues, form]);  

  return (
    <>
      <Form 
        size="large" 
        name={isUpdate ? "editing_supplier_form": "adding_supplier_form" }
        className="row ogin-form" 
        layout="vertical" 
        form={form}
        >
        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="supplier_company" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Company Name" placeholder="Enter Company Name" name="supplier_company" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="supplier_rep" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Representative Name" placeholder="Enter Company Representative Name" name="supplier_rep" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="supplier_phone" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Phone" placeholder="Enter Company Phone" name="supplier_phone" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="supplier_email" rules={[validator.require, validator.email]} hasFeedback>
            <Inputs type="email" label="Email" placeholder="Enter Company Email" name="supplier_email" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="supplier_address" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Address" placeholder="Enter Company Address" name="supplier_address" required={true} />
          </Form.Item>
        </div>
      </Form>
      {/* <FrenchPressLoader/> */}
    </>
    
  );

});

export default AddEditSupplier;
