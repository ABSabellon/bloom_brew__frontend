import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "antd";
import { Link } from "react-router-dom";
import AddEditSale from "./AddEditSales";
import SaleDetails from "./SaleDetails";
import Table from "../../../components/tables/datatable";
import CoffeeDrawer from "../../../components/drawers/coffeeDrawer";
import IconMap from "../../../components/iconMap/IconMap";
import productsJson from "../../../../assets/jsons/productsJson.json"
import Swal from "sweetalert2";

const validator = {
  require: {required: true, message: "Required"},
  email: { type: 'email', message: 'Invalid email format' }
};

const ManageSales = () => {
  const [addEditSale, setAddEditSale] = useState(false);
  const [viewSale, setViewSale] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const products = productsJson

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
  const [data] = useState([
    {
      id: 1,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0101",
      Total: 0,
      Biller: "Admin",
    },
    {
      id: 2,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0102",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:3,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0103",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:4,
      Name: "Fred C. Rasmussen",
      Date: "19 Nov 2022",
      Reference: "SL0104",
      Total: 300,
      Biller: "Admin",
    },
    {
      id:5,
      Name: "Thomas M. Martin",
      Date: "19 Nov 2022",
      Reference: "SL0105",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:6,
      Name: "Thomas M. Martin",
      Date: "19 Nov 2022",
      Reference: "SL0106",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:7,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0107",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:8,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0108",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:9,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0109",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:10,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0110",
      Total: 0,
      Biller: "Admin",
    },
    {
      id:11,
      Name: "walk-in-customer",
      Date: "19 Nov 2022",
      Reference: "SL0111",
      Total: 0,
      Biller: "Admin",
    },
  ]);

  const columns = [
    {
      title: "Costumer name",
      dataIndex: "Name",
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Reference",
      dataIndex: "Reference",
      sorter: (a, b) => a.Reference.length - b.Reference.length,
    },
    {
      title: "Total",
      dataIndex: "Total",
      sorter: (a, b) => a.Total.length - b.Total.length,
    },
    {
      title: "Biller",
      dataIndex: "Biller",
      sorter: (a, b) => a.Biller.length - b.Biller.length,
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Link className="me-3" to="#" onClick={() => handleOpenDrawer("viewSale")}>
            {IconMap('AiOutlineEye',null,null,24)}
          </Link>
          <Link className="me-3" to="#" onClick={() => editData(record)}>
            {IconMap('AiOutlineEdit',null,null,24)}
          </Link>
          <Link className="confirm-text" to="#" onClick={confirmText}>
            {IconMap('FiTrash2',"text-danger",null,24)}
          </Link>
        </>
      ),
    },
  ];
  const editData = (data) => {
    console.log('test :::: ', data)
    setInitialValues({
      biller: data.Biller,
      transaction_date: data.description,
      customer_name: data.Name,
      reference_no: data.Reference,
      total_price: data.Total,
    });
    // setInitialValues(setData);
    handleOpenDrawer("addEditSale");
    
  };

  const handleOpenDrawer = (drawer) => {
    switch(drawer){
      case "addEditSale":{
        setAddEditSale(!addEditSale);
        break;
      }
      case "viewSale":{
        setViewSale(!viewSale);
        break;
      }
    }
  };

  const handleDrawerSubmit = () => {
    console.log('test ::: ', data);
  
    if (dataUpdate.length == 0) {
      addConfirm({ type: 'category', url: '/api/categories/create', dataValue:data, handleDrawerSuccess, handleCloseDrawer  });
    } else {
      editConfirm({ type: 'category', url: `/api/categories/${dataUpdate}`, dataValue:data, handleDrawerSuccess, handleCloseDrawer  });
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Sales List</h4>
              <h6>Manage your Sales</h6>
            </div>
            <div className="page-btn">
              <Link to="#" 
              className="btn btn-added"
                onClick={() => {
                  setInitialValues({})
                  handleOpenDrawer("addEditSale")
                }}
              >
                
                {IconMap('AiOutlinePlus',"me-1",null,24)}
                Add Sales
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      <CoffeeDrawer
        open={addEditSale}
        handleOk={handleDrawerSubmit}
        title={"Add Sale"}
        body={
          <AddEditSale initialValues={initialValues} data={products}/>
        }
        closable={false}
        footer={
          <>
            <Button type="submit" className="btn btn-submit me-2">
              Submit
            </Button>
            <Button className="btn btn-cancel" 
              onClick={
                () => handleOpenDrawer("addEditSale")
                }>
              Cancel
            </Button>
          </>
        }
      />
      <CoffeeDrawer
        open={viewSale}
        handleOk={handleDrawerSubmit}
        title={"Sale Details: SL0101"}
        body={
          <SaleDetails data={products}/>
        }
        closable={false}
        footer={
          <>
            <Button className="btn btn-cancel" 
              onClick={
                () => handleOpenDrawer("viewSale")
                }>
              Close
            </Button>
          </>
        }
      />
      
    </>
  );
};

export default ManageSales;
