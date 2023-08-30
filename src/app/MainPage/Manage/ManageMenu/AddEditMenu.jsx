import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Form } from "antd";
import Inputs from "../../../components/forms/inputs";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";
import IconMap from "../../../components/iconMap/IconMap";
import ImageUploader from "../../../components/forms/imageUploader";

const validator = {
  require: { required: true, message: "Required" },
};

const AddEditMenu = forwardRef(({ initialValues, categoryOption, isUpdate, isOpened }, ref) => {
  
  // console.log('isUpdate ::: ', isUpdate)
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  // Functions
  const categoryValidator = () => ({
    validator(_, value) {
      if (categoryOption.some(option => option.value === value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Invalid category selected."));
    },
  });

  const validateProductImage = (_, value) => {
    if (value && value.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject("At least 1 product image is required.");
  };

  const validatePriceHot = (rule, value, callback) => {
    const priceInput = form.getFieldValue('price_cold');
    if (!value && !priceInput) {
      return Promise.reject("Price is required (Hot/Cold).");
    } else {
      return Promise.resolve();
    }
  };

  const validatePriceCold = (rule, value, callback) => {
    const priceInput = form.getFieldValue('price_hot');
    if (!value && !priceInput) {
      return Promise.reject("Price is required (Hot/Cold).");
    } else {
      return Promise.resolve();
    }
  };

  const validateForm = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      throw error;
    }
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  
    // Map the newFileList to get the actual binary data (Blob)
    const filesNotInStorage = newFileList.filter(file => !file.isInStorage || file.isInStorage === false);
    const filesInStorage = newFileList.filter(file => file.isInStorage || file.isInStorage === true);
    const binaryImageFiles = filesNotInStorage.map(file => file.originFileObj);
  
    // console.log('newFileList ::: ', newFileList)

    const filesUrl = [...filesInStorage, ...binaryImageFiles];
  
    form.setFieldsValue({
      product_image: filesUrl || [], // Set to an empty array if newFileList is undefined
    });
  };

  const onCategorySelect = (value) => {
    const matchCategory = categoryOption.find(option => option.value === value);
    if (matchCategory) {
      setSelectedCategory(matchCategory);
    }
  };

  // useEffect
  useEffect(() => {
    form.resetFields();
    setFileList([]);
    if (isUpdate) {
      setFileList(initialValues.image_files);
      onCategorySelect(initialValues.category_details.name);
      form.setFieldsValue({
        menu_name: initialValues.name,
        menu_category: initialValues.category_details.name,
        price_hot: initialValues.price_list?.hot?.price || null,
        price_cold: initialValues.price_list?.cold?.price || null,
        price: initialValues.price_list?.price || null,
        product_image: initialValues.imgs || [],
      });
    }
  }, [initialValues, form]);

  // useImperativeHandle
  useImperativeHandle(ref, () => ({
    
    formSubmit: async () => {
      try {
        const formValues = await validateForm();
    
        let tempData = {
          name: formValues.menu_name,
          category_id: selectedCategory.id,
          price_list: selectedCategory.has_temp
            ? { hot: formValues.price_hot?  { price: formValues.price_hot } : null,
                cold: formValues.price_cold?  { price: formValues.price_cold } : null,}
            : { price: formValues.price }, // Default price object when has_temp is false
          
          raw_imgs:formValues.product_image,
          imgs:null,
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
  
  return (
    <>
      <Form 
        size="large" 
        name={isUpdate? "editing_menu_form": "adding_menu_form"} 
        className="row ogin-form" 
        layout="vertical" 
        form={form}
        >
        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="menu_name" rules={[validator.require]} hasFeedback>
            <Inputs type="text" label="Product Name" placeholder="Enter Product Name" name="menu_name" required={true} />
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12">
          <Form.Item name="menu_category" rules={[categoryValidator]} hasFeedback>
            <Inputs type="autocomplete" label="Category Name" placeholder="Enter Category Name" name="menu_category" option={categoryOption} required={true} onChange={(e)=>onCategorySelect(e)}/>
          </Form.Item>
        </div>

        <div className="col-lg-4 col-sm-6 col-12 d-none d-lg-block"></div>
        
        {selectedCategory && selectedCategory.has_temp ? (
        <>
          <div className="col-lg-4 col-sm-6 col-12">
            <Form.Item name="price_hot"  rules={[{ validator: validatePriceHot }]}>
              <Inputs type="price" label="Price(Hot)" prefix={IconMap('FaTemperatureHigh','text-danger',null,20)} placeholder="Enter price for hot drink" name="price_hot" format={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
            </Form.Item>
          </div>
          <div className="col-lg-4 col-sm-6 col-12">
            <Form.Item name="price_cold" rules={[{ validator: validatePriceCold }]}>
              <Inputs type="price" label="Price(Cold)" prefix={IconMap('FaTemperatureLow','text-primary',null,20)} placeholder="Enter price for cold drink" name="price_cold" format={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} required={true}/>
            </Form.Item>
          </div>
        </>
        ) : (
          <div className="col-lg-4 col-sm-6 col-12">
            <Form.Item name="price" rules={[validator.require]}>
              <Inputs type="price" label="Price" placeholder="Enter price" name="price" format={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
            </Form.Item>
          </div>
        )}

        <div className="col-lg-12">
          <Form.Item name="product_image" rules={[{ validator: validateProductImage }]}>
            <>
              <input type="hidden" required/>

              <ImageUploader fileList={fileList} onChange={onUploadChange} />
            </>
          </Form.Item>
        </div>
      </Form>
    </>
    
  );
});

export default AddEditMenu;
