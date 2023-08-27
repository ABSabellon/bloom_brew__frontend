import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../../components/tables/datatable"
import Tabletop from "../../../components/tables/tabletop"
import "react-select2-wrapper/css/select2.css";
import IconMap from "../../../components/iconMap/IconMap";
import DataService from "../../../EntryFile/Services/DataService";

const ManageProducts = () => {
  const [data,setData] = useState([]);

  //select2
  const options = [
    { id: 1, text: "Choose Product", text: "Choose Product" },
    { id: 2, text: "Macbook pro", text: "Macbook pro" },
    { id: 3, text: "Orange", text: "Orange" },
  ];
  const options2 = [
    { id: 1, text: "Choose Category", text: "Choose Category" },
    { id: 2, text: "Computers", text: "Computers" },
    { id: 3, text: "Fruits", text: "Fruits" },
  ];
  const options3 = [
    { id: 1, text: "Choose Sub Category", text: "Choose Sub Category" },
    { id: 2, text: "Computers", text: "Computers" },
  ];
  const options4 = [
    { id: 1, text: "Brand", text: "Brand" },
    { id: 2, text: "N/D", text: "N/D" },
  ];
  const options5 = [
    { id: 1, text: "Price", text: "Price" },
    { id: 2, text: "150.00", text: "150.00" },
  ];
  
  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.productName}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Temperature",
      dataIndex: "temp",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      sorter: (a, b) => a.createdBy.length - b.createdBy.length,
    },
    {
      title: "Action",
      render: () => (
        <>
          <>
            <Link className="me-3" to="/admin/product/product-details">
              {IconMap('AiOutlineEye',null,null,24)}
            </Link>
            <Link className="me-3" to="/admin/product/editproduct-product">
              {IconMap('AiOutlineEdit',null,null,24)}
            </Link>
            <Link className="confirm-text" to="#" onClick={confirmText}>
              {IconMap('FiTrash2',"text-danger",null,24)}
            </Link>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/admin/product/addproduct-product"
                className="btn btn-added"
              >
                {IconMap('AiOutlinePlus',"me-1",null,24)}
                Add New Product
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop 
              />
              <div className="table-responsive">
                <Table                                    
                  columns={columns}
                  dataSource={data}                 
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default ManageProducts;
