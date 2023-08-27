import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Table from "../../../components/tables/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../../components/tables/tabletop";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import IconMap from "../../../components/iconMap/IconMap";
import CoffeeDrawer from "../../../components/drawers/coffeeDrawer";
import AddEditCategory from "./AddEditCategory";

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
const ManageCategory = () => {
  const childRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // const [data, setData] = useState({
  //   name: '',
  //   description: '',
  //   created_at:'',
  //   created_by:'admin'
  // });

  const handleOpenDrawer = () => {
    setIsLoading(true); // Assuming setIsLoading is a state update function
   
    setOpenDrawer(!openDrawer);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const handleDrawerSubmit = async () => {
    setIsLoading(true);
    if (childRef.current) {
      const validation = await childRef.current.formSubmit();
      if (validation.success) {
        setIsLoading(false);
        handleOpenDrawer();
        // const formData = validation.data;
        // console.log('Received form data:', formData);
        // Handle form data as needed (e.g., submit to API)
      } else {
        console.error('Form validation error:', validation.error);
      }
      // handleOpenDrawer();
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.categoryName}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
    },
    {
      title: "Category Code",
      dataIndex: "categoryCode",
      sorter: (a, b) => a.categoryCode.length - b.categoryCode.length,
    },
    {
      title: " Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
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
            <Link className="me-3" to="#" onClick={() => editData(record)}>
              {IconMap('AiOutlineEye',null,null,24)}
            </Link>
            <Link className="confirm-text" to="#" onClick={confirmText}>
              {IconMap('FiTrash2',"text-danger",null,24)}
            </Link>
          </>
        </>
      ),
    },
  ];

  const editData = (formData) => {
    console.log('test at Parent :::: ', formData)
    // setInitialValues(setData);
    handleOpenDrawer();
    
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-added"
                onClick={() => {
                  // setInitialValues({})
                  handleOpenDrawer()
                }}

              >
                {IconMap('AiOutlinePlus',"me-1",null,24)}
                Add Category
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
        </div>
      </div>
      <CoffeeDrawer
        open={openDrawer}
        handleOk={handleDrawerSubmit}
        title={"Add Category "}
        isLoading={isLoading}
        body={
          <AddEditCategory 
            initialValues={initialValues} 
            data={data} 
            ref={childRef} 
            // onFormSubmit={editData}
            />
        }
        closable={false}
        footer={
          <>
            <Button type="submit" className="btn btn-submit me-2"
              onClick={handleDrawerSubmit}
              >
              Submit
            </Button>
            <Button className="btn btn-cancel" 
              onClick={
                () => handleOpenDrawer()
                }>
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
};
export default ManageCategory;
