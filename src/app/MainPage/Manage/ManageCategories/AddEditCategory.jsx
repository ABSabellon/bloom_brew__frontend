import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
// import CoffeeLoader from "../../../components/loaders/coffeeloader";
import FrenchPressLoader from "../../../components/loaders/frenchPressLoader";
import DataService from "../../../EntryFile/Services/DataService";
import Inputs from "../../../components/forms/inputs";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";

const validator = {
  require: { required: true, message: "Required" },
};

const AddEditCategory = forwardRef(({ initialValues, dataSource }, ref) => {
  const dataS = new DataService('Categories');
  const [values,setValues]=useState({})
  const [form] = Form.useForm();

  // Expose the formSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    formSubmit: async () => {
      try {
        const formValues = await validateForm();
        let tempData = {
          name: formValues.category_name,
          description: formValues.category_description,
          type: window.location.href.includes("inventory-") ? "inventory" : "product",
          created_at: new Date(),
          created_by: 'admin',
          updated_at: null,
          updated_by: null,
        }
        console.log('Form DATA after submit:', tempData);

        await dataS.addItems(tempData, 'CT');

        return { success: true, data: tempData, }; // Return validation success and form data
      } catch (error) {
        console.error('Form validation error:', error);
        return { success: false, error }; // Return validation failure and error
      }
    }
  }));

  const validateForm = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Form 
        size="large" 
        name="user_login" 
        className="row ogin-form" 
        layout="vertical" 
        initialValues={values}
        form={form}
        >
        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="category_name" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Category Name" placeholder="Enter Category Name" name="category_name" required={true} />
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
