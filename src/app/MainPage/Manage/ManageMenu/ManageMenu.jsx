import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "../../../components/tables/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../../components/tables/tabletop";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import IconMap from "../../../components/iconMap/IconMap";
import CoffeeDrawer from "../../../components/drawers/coffeeDrawer";
import AddEditMenu from "./AddEditMenu";
import DeleteConfirm from "../../../components/confirm/deleteConfirm";
import AddConfirm from "../../../components/confirm/addConfirm";
import EditConfirm from "../../../components/confirm/editConfirm";
import DataHandlingService from "../../../EntryFile/Services/DataHandlingService";

const ManageMenu = () => {
  const childRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(false);
  const [categoryOption, setCategoryOption]= useState([]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
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
      title: "Allergens",
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
      render: (text,record) => (
        <>
          <Link className="me-3" to="#" onClick={() => editData(record)}>
            {IconMap('AiOutlineEdit',null,null,24)}
          </Link>
          <Link className="confirm-text" to="#" onClick={() => {
            DeleteConfirm({ collection:'Categories',record:record.id, updateTable})
          }}>
            {IconMap('FiTrash2',"text-danger",null,24)}
          </Link>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {

      const menuDataHandler = new DataHandlingService('Menu');
      const fetchedMenuData = await menuDataHandler.getData();
      // const fetchedMenuData = await data
      setData(fetchedMenuData)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchCategoryOption = async () => {
    try {
      const categoryDataHandler = new DataHandlingService('Categories');
      const fetchedCategoryData = await categoryDataHandler.fetchDataWithQuery('type', '==', window.location.href.includes("inventory-") ? 'inventory' : 'menu');
      if (fetchedCategoryData) {
        const mappedOptions = fetchedCategoryData.map(item => ({
          value: item.name,
          id: item.id,
        }));
        setCategoryOption(mappedOptions);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTable]);

  const handleOpenDrawer = () => {
    setIsLoading(true);
    setOpenDrawer(!openDrawer);
    fetchCategoryOption();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleDrawerSubmit = async () => {
    setIsLoading(true);

    const isUpdate = await Object.keys(initialValues).length > 0;

    if (childRef.current) {
      const validation = await childRef.current.formSubmit();
      if (validation.success) {
        console.log('submitted Data ::: ', validation.data)
        // if (isUpdate) {
        //   EditConfirm({ collection: 'Categories', id: initialValues.id, record: validation.data, updateTable, handleOpenDrawer });
        // } else {
        //   AddConfirm({ collection: 'Categories', record: validation.data, updateTable, handleOpenDrawer,dataPrefix:'MN' });
        // }
      } else {
        setIsLoading(false);
        console.error('Form validation error:', validation.error);
      }
    }
  };

  const updateTable = () => {
    setRefreshTable(true);
    setTimeout(() => setRefreshTable(false), 0);
  };

  const editData = async (rowData) => {
    const data = await rowData;

    setData({
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.description,
      created_at: data.created_at,
      created_by: data.created_by,
      updated_at: data.updated_at,
      updated_by: data.updated_by,
    });
    setInitialValues(data);
    handleOpenDrawer();
  };

  return (
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
                setInitialValues({});
                handleOpenDrawer();
              }}
            >
              {IconMap('AiOutlinePlus', 'me-1', null, 24)}
              Add Menu
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Tabletop />
            <div className="table-responsive">
              <Table
                columns={columns}
                data={data}
                reloadTable={refreshTable}
                collectionName="Categories"
              />
            </div>
          </div>
        </div>
      </div>
      <CoffeeDrawer
        open={openDrawer}
        handleOk={handleDrawerSubmit}
        title={"Add Menu "}
        isLoading={isLoading}
        body={
          <AddEditMenu
            initialValues={initialValues}
            ref={childRef}
            categoryOption={categoryOption}
          />
        }
        closable={false}
        footer={
          <>
            <Button
              type="submit"
              className="btn btn-submit me-2"
              onClick={handleDrawerSubmit}
            >
              Submit
            </Button>
            <Button
              className="btn btn-cancel"
              onClick={() => handleOpenDrawer()}
            >
              Cancel
            </Button>
          </>
        }
      />
    </div>
  );
  
};
export default ManageMenu;
