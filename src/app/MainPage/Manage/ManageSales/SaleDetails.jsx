import React, { useState } from "react";
import "react-select2-wrapper/css/select2.css";
import Table from "../../../components/tables/datatable";

const SaleDetails = (data) => {
  
  const options = [
    { id: 1, text: "Completed", text: "Completed" },
    { id: 2, text: "Inprogess", text: "Inprogess" },
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
      details: "price",
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

  return (
    <div className="item-details">
      <div  className="row">
        <div className="col-4">
          <h4>Customer Info</h4>
          <ul> 
            <li><strong>Customer Name</strong><span>Aileen Ganda</span></li>
            {/* <li>customer email</li>
            <li>customer contact</li> */}
          </ul> 
          
        </div>
        <div className="col-4">
          <h4>Purchase Info</h4>
          <ul>
           <li><p>purchase date</p><span>Nov 29 2023</span></li>
            {/* <li>customer email</li>
            <li>customer contact</li> */}
          </ul> 
          
        </div>
        <div className="col-4">
          <h4>Invoice Info</h4>
          <ul>
            <li><p>Reference #</p><span>SL0101</span></li>
            {/* <li>customer email</li>
            <li>customer contact</li> */}
          </ul> 
          
        </div>
      </div>

      
      <Tabletop 
        />
        <div className="table-responsive">
          <Table                                    
            columns={columns}
            dataSource={data}                 
          />
        </div>
      
      <div className="row">
        <div className="col-lg-6 ">
          <div className="total-order w-100 max-widthauto m-auto mb-4">
            <ul>
              <li>
                <h4>Order Tax</h4>
                <h5>$ 0.00 (0.00%)</h5>
              </li>
              <li>
                <h4>Discount </h4>
                <h5>$ 0.00</h5>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div className="total-order w-100 max-widthauto m-auto mb-4">
            <ul>
              <li>
                <h4>Shipping</h4>
                <h5>$ 0.00</h5>
              </li>
              <li className="total">
                <h4>Grand Total</h4>
                <h5>$ 0.00</h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default SaleDetails;
