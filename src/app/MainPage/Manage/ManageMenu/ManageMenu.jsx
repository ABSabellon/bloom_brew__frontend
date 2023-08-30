import React, { useState, useRef, useEffect } from "react";
import { fetchMenuData, fetchCategoryOptionData } from "../../../EntryFile/Utilities/dataUtils";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "../../../components/tables/datatable";
import Tabletop from "../../../components/tables/tabletop";
import AddConfirm from "../../../components/confirm/addConfirm";
import EditConfirm from "../../../components/confirm/editConfirm";
import CoffeeDrawer from "../../../components/drawers/coffeeDrawer";
import DeleteConfirm from "../../../components/confirm/deleteConfirm";
import IconMap from "../../../components/iconMap/IconMap";
import AddEditMenu from "./AddEditMenu";

const ManageMenu = () => {
  const childRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTable, setRefreshTable] = useState(true);
  const [categoryOption, setCategoryOption]= useState([]);
  const [drawerTitle, setDrawerTitle] = useState('Add Category');
  const [drawerButton, setDrawerButton] = useState('Submit');

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record.imgs[0]} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.name}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category",
      dataIndex: ["category_details","name"],
      sorter: (a, b) => a.category_details.name.length - b.category_name.length,
    },
    {
      title: "Price",
      render: (text, record) => (
        <div className="product-price">
          {record.category_details.has_temp ? (
            <>
              <p>
                {IconMap('FaTemperatureHigh', 'text-danger me-1', null, 20)}
                <span> {record.formatted_price.hot.price}</span>
              </p>
              <p>
                {IconMap('FaTemperatureLow', 'text-primary me-1', null, 20)}
                <span> {record.formatted_price.cold.price}</span>
              </p>
            </>
          ) : (
            <span> {record.formatted_price.price}</span>
          )}
        </div>
      ),
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
            DeleteConfirm({ collection:'Menu',record:record.id, updateTable})
          }}>
            {IconMap('FiTrash2',"text-danger",null,24)}
          </Link>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const fetcheData = await fetchMenuData();
      console.log('fetcheData ::: ', fetcheData)
      if(fetcheData){
        setData(fetcheData)
        setRefreshTable(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchCategoryOption = async () => {
    try {
      const fetcheData = await fetchCategoryOptionData('menu');
      // console.log('fetchedCategoryOption :: ', fetcheData)
      
      return fetcheData
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTable]);

  const handleOpenDrawer = () => {
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
      // console.log('validation  ::: ', validation)
      if (validation.success) {
        // console.log('submitted Data ::: ', validation.data)
          let tempData = {
            name: validation.data.name,
            category_id: validation.data.category_id,
            price_list: validation.data.price_list,
            imgs:null,
            created_at: validation.data.created_at,
            created_by: validation.data.created_by,
            updated_at: validation.data.updated_at,
            updated_by: validation.data.updated_by
          }
        if (isUpdate) {
          
          // console.log('tempData Data ::: ', tempData)
          // console.log('fileList ::: ', validation.data.raw_imgs)
          EditConfirm({ collection: 'Menu', id: initialValues.id, data: tempData, updateTable, handleOpenDrawer,has_files:true, fileList:validation.data.raw_imgs });
        } else {
          AddConfirm({ collection: 'Menu', data: tempData, updateTable, handleOpenDrawer,dataPrefix:'MN',has_files:true, fileList:validation.data.raw_imgs});
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

  const addData = async()=>{
    setIsLoading(true);
    
    const categOption = await fetchCategoryOption();
    setCategoryOption(categOption)
    const hasCateg = Object.keys(categOption).length;
    if(hasCateg){
      setDrawerTitle('Add Category');
      setDrawerButton('Submit');
      handleOpenDrawer();
    }

  }

  const editData = async (rowData) => {
    setIsLoading(true);
    const categOption = await fetchCategoryOption();
    setCategoryOption(categOption)
    const hasCateg = Object.keys(categOption).length;
    if(hasCateg){
      
      setDrawerTitle('Edit Category');
      setDrawerButton('Update');
      setInitialValues(rowData);
      handleOpenDrawer();

    }
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
                addData();
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
        title={drawerTitle}
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
              onClick={() => handleDrawerSubmit()}
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
export default ManageMenu;
