import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "../../../components/tables/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../../components/tables/tabletop";
import IconMap from "../../../components/iconMap/IconMap";
import CoffeeDrawer from "../../../components/drawers/coffeeDrawer";
import AddEditCategory from "./AddEditCategory";
import DeleteConfirm from "../../../components/confirm/deleteConfirm";
import AddConfirm from "../../../components/confirm/addConfirm";
import EditConfirm from "../../../components/confirm/editConfirm";
import DataHandlingService from "../../../EntryFile/Services/DataHandlingService";

const ManageCategory = () => {
  const childRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(true);
  const [drawerTitle, setDrawerTitle] = useState('Add Category');
  const [drawerButton, setDrawerButton] = useState('Submit');

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category Code",
      dataIndex: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: text => {
        if (text.length > 40) {
          return `${text.substring(0, 40)}...`;
        }
        return text;
      },
    },
    {
      title: "Created By",
      dataIndex: "created_by",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHandler = new DataHandlingService('Categories');
        const fetchedData = await dataHandler.fetchDataWithQuery('type', '==', window.location.href.includes("inventory-") ? 'inventory' : 'menu');
        if(fetchedData){
          setData(fetchedData);
          setRefreshTable(false);
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setRefreshTable(false);
      }
    };

    fetchData();
  }, [refreshTable]);

  const handleOpenDrawer = () => {
    setIsLoading(true);
    setOpenDrawer(!openDrawer);
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
        if (isUpdate) {
          EditConfirm({ collection: 'Categories', id: initialValues.id, record: validation.data, updateTable, handleOpenDrawer });
        } else {
          AddConfirm({ collection: 'Categories', record: validation.data, updateTable, handleOpenDrawer,dataPrefix:'CT' });
        }
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
    setDrawerTitle('Edit Category');
    setDrawerButton('Update');
    setInitialValues(rowData);
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
                setDrawerTitle('Add Category');
                setDrawerButton('Submit');
                setInitialValues({});
                handleOpenDrawer();
              }}
            >
              {IconMap('AiOutlinePlus', 'me-1', null, 24)}
              Add Category
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
        title={drawerTitle}
        isLoading={isLoading}
        body={
          <AddEditCategory
            initialValues={initialValues}
            ref={childRef}
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
              {drawerButton}
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

export default ManageCategory;
