
import React, { useState } from "react";
import { Form } from "antd";
import IconMap from "../../../components/iconMap/IconMap";
import Inputs from "../../../components/forms/inputs";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-select2-wrapper/css/select2.css";
import Table from "../../../components/tables/datatable";

const validator = {
  require: {required: true, message: "Required"},
  email: { type: 'email', message: 'Invalid email format' }
};
const AddEditSale = ({initialValues,data}) => {

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

  const columns = [
    {
      title: "Product name",
      dataIndex: "name",
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Temp",
      details: "temp",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: "Price",
      details: "price",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Sub Total",
      dataIndex: "Total",
      sorter: (a, b) => a.Total.length - b.Total.length,
    },
  ];

  return(
    <Form size="large" name="user_login" className="row ogin-form" layout="vertical" initialValues={initialValues}>
      <div className="col-lg-3 col-sm-6 col-12">
        <Form.Item name="customer_name" rules={[validator.require]} hasFeedback>
          <Inputs type="text" label="Customer Name" placeholder="Enter Customer Name" name="customer_name" required={true}/>
        </Form.Item>
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        <Form.Item name="transaction_date" rules={[validator.require]} hasFeedback>
          <Inputs type="datepicker" label="Date of Transaction" placeholder="Select Date" name="transaction_date" required={true} disabledDate={(current) => current && current < moment().endOf('day')} />
        </Form.Item>
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        <Form.Item name="reference_no" rules={[validator.require]} hasFeedback>
          <Inputs type="text" label="Reference Number" placeholder="Enter reference number" name="reference_no" required={true} />
        </Form.Item>
      </div>
      <div className="col-lg-3 col-sm-6 col-12">
        <Form.Item name="biller" hasFeedback>
          <Inputs type="text" label="Biller" value="Admin" placeholder="Biller" name="biller" readOnly={true} required={true} />
        </Form.Item>
      </div>
      <div className="col-lg-12">
       
        <Table columns={columns} dataSource={data} />
      </div>
    </Form>
  );

}

export default AddEditSale;