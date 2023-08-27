import React, { useState, useEffect,useRef}  from "react";
import {Link} from "react-router-dom";
import { Form } from "antd";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Upload } from "../../components/imagePath/imagePath";
import Inputs from "../../components/forms/inputs";


const validator = {
  require: {required: true, message: "Required"},
  email: { type: 'email', message: 'Invalid email format' }
};

const GeneralSettings = () => {

  const options11= [
    {label: 'Libraries',options: [{ id: 0, value: 'Custom Library 1' },{ id: 1,value: 'Custom Library 2' }]},
    {label: 'Solutions',options: [{ id: 0,value: 'Custom Solution 1' },{ id: 1,value: 'Custom Solution 2' }]},
    {label: 'Articles',options: [{ id: 0,value: 'Custom Article 1' }]}
  ];

  const options22 = [
    { value: 'Apple', id:0 },
    { value: 'Banana', id:1 },
    { value: 'Cherry', id:2 },
    { value: 'Date' , id:3 },
  ];

  const confirmPasswordValidator = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The new password that you entered do not match!'));
    },
  });
    
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>General Setting</h4>
            <h6>Manage General Setting</h6>
          </div>
        </div>
        {/* /add */}
        <div className="card">
          <div className="card-body">
            <Form size="large" name="user_login" className="row ogin-form" layout="vertical">
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="grouped-autocomplete"hasFeedback>
                  <Inputs type="grouped-autocomplete" label="grouped-autocomplete" placeholder="grouped-autocomplete" name="grouped-autocomplete" option={options11} />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm -6 col-12">
                <Form.Item name="email" rules={[validator.require, validator.email]} hasFeedback>
                  <Inputs type="email" label="email" placeholder="Email" name="email" required={true}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="autocomplete" hasFeedback>
                  <Inputs type="autocomplete" label="autocomplete" placeholder="autocomplete" name="autocomplete" option={options22}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="select" hasFeedback>
                  <Inputs type="select" label="selector" placeholder="Select" name="selector" option={options22}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="text" hasFeedback>
                  <Inputs type="text" label="text" placeholder="text" name="text" />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="password" hasFeedback>
                  <Inputs type = "password" label="password" placeholder="password" name="password"
                  />
                </Form.Item>
              </div>
              
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="confirm-password" rules={[validator.require, confirmPasswordValidator]} hasFeedback>
                  <Inputs type = "password" label="confirm password" placeholder="confirm password" name="confirmconfirm-password" />
                </Form.Item>
              </div>
              
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="text" hasFeedback>
                  <Inputs type = "text" label="text"  placeholder="text" name="text" />
                </Form.Item>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <Form.Item name="phone" hasFeedback>
                  <Inputs type = "text" label="phone" placeholder="phone"  name="phone" addonBefore={'+63'}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label> Product Image</label>
                  <div className="image-upload">
                    <input type="file" />
                    <div className="image-uploads">
                      <img src={Upload} alt="img" />
                      <h4>Drag and drop a file to upload</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Link to="#" className="btn btn-submit me-2">
                    Submit
                  </Link>
                  <Link to="#" className="btn btn-cancel">
                    Cancel
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
        {/* /add */}
      </div>
    </div>
  );
};

export default GeneralSettings;
