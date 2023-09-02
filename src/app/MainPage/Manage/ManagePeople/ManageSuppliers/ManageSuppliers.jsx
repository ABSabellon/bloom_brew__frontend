import React, { useState, useRef, useEffect } from "react";
import { fetchSuppliersData } from "../../../../EntryFile/Utilities/dataUtils";
import { Button } from "react-bootstrap";
import Table from "../../../../components/tables/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../../../components/tables/tabletop";
import IconMap from "../../../../components/iconMap/IconMap";
import CoffeeDrawer from "../../../../components/drawers/coffeeDrawer";
import AddEditSupplier from "./AddEditSupplier";
import DeleteConfirm from "../../../../components/confirm/deleteConfirm";
import AddConfirm from "../../../../components/confirm/addConfirm";
import EditConfirm from "../../../../components/confirm/editConfirm";
import DataHandlingService from "../../../../EntryFile/Services/DataHandlingService";

const ManageSuppliers = () => {
  const childRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(true);
  const [drawerTitle, setDrawerTitle] = useState('Add Supplier');
  const [drawerButton, setDrawerButton] = useState('Submit');

  const columns = [
    {
      title: "Company",
      dataIndex: "company_name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Representative Name",
      dataIndex: "rep_name",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Added By",
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
            DeleteConfirm({ collection:'Suppliers',record:record.id, updateTable})
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
        const fetchedData = await fetchSuppliersData();  
        if (fetchedData) {
          // Filter the data based on the searchQuery
          const filteredData = fetchedData.filter((item) =>
            item.company_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
  
          setData(filteredData);
          setRefreshTable(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setRefreshTable(false);
      }
    };
  
    fetchData();
  }, [refreshTable, searchQuery]);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  
  const handleCloseDrawer = ()=>{
    setIsUpdate(false);
    setOpenDrawer(false);
  }

  const handleDrawerSubmit = async () => {
    setIsLoading(true);

    if (childRef.current) {
      const validation = await childRef.current.formSubmit();
      if (validation.success) {
        console.log('validation.data :::: ', validation.data)
        if (isUpdate) {
          EditConfirm({ collection: 'Suppliers', id: initialValues.id, record: validation.data, updateTable, handleCloseDrawer });
        } else {
          AddConfirm({ collection: 'Suppliers', data: validation.data, updateTable, handleCloseDrawer, dataPrefix:'SP' });
        }
      } else {
        setIsLoading(false);
        console.error('Form validation error:', validation.error);
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setRefreshTable(true); // Activate table reload when searching
  };

  const updateTable = () => {
    setRefreshTable(true);
    setTimeout(() => setRefreshTable(false), 0);
  };
  
  const addData = async()=>{
    setIsLoading(true);
    
    setDrawerTitle('Add Supplier');
    setDrawerButton('Submit');
    setIsUpdate(false);
    handleOpenDrawer();

  }

  const editData = async (rowData) => {
    setDrawerTitle('Edit Supplier');
    setDrawerButton('Update');
    setInitialValues(rowData);
    setIsUpdate(true);
    handleOpenDrawer();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Supplier List </h4>
            <h6>View/Search suppliers</h6>
          </div>
          <div className="page-btn">
            <Link
              to="#"
              className="btn btn-added"
              onClick={() => {
                // setDrawerTitle('Add Supplier');
                // setDrawerButton('Submit');
                // setInitialValues({});
                // handleOpenDrawer();
                addData();
              }}
            >
              {IconMap('AiOutlinePlus', 'me-1', null, 24)}
              Add Supplier
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Tabletop onSearch={handleSearch}/>
            <div className="table-responsive">
              <Table
                columns={columns}
                data={data}
                reloadTable={refreshTable}
                collectionName="Suppliers"
              />
            </div>
          </div>
        </div>
      </div>
      {openDrawer && (
        <CoffeeDrawer
          open={openDrawer}
          handleOk={handleDrawerSubmit}
          title={drawerTitle}
          isLoading={isLoading}
          body={
            <AddEditSupplier
              initialValues={initialValues}
              ref={childRef}
              isUpdate={isUpdate}
            />
          }
          closable={false}
          close={handleCloseDrawer}
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
                onClick={() => handleCloseDrawer()}
              >
                Cancel
              </Button>
            </>
          }
        />
      )}
    </div>
  );
};

export default ManageSuppliers;
