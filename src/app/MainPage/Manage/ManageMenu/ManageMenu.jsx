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
import { ImageViewer } from "../../../EntryFile/Utilities/imageUtils";

const ManageMenu = () => {
  const AddEditMenuRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isUpdate, setIsUpdate] = useState(false);
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
          <ImageViewer images={record.imgs} width={50} />
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.name}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: ["category_details","name"],
      sorter: (a, b) => a.category_details.name.localeCompare(b.category_details.name),
    },
    {
      title: "Price",
      render: (text, record) => (
        <div className="product-price">
          {record.category_details.has_temp ? (
            <>
              {record.formatted_price.hot && (
                <p>
                  {IconMap('FaTemperatureHigh', 'text-danger me-1', null, 20)}
                  <span> {record.formatted_price.hot.price}</span>
                </p>
              )}
              {record.formatted_price.cold && (
                <p>
                  {IconMap('FaTemperatureLow', 'text-primary me-1', null, 20)}
                  <span> {record.formatted_price.cold.price}</span>
                </p>
              )}
            </>
          ) : (
            <p><span> {record.formatted_price.price}</span></p>
          )}
        </div>
      ),
    },    
    {
      title: "Added By",
      dataIndex: "created_by",
      sorter: (a, b) => a.created_by.localeCompare(b.created_by),
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
      const fetchedData = await fetchMenuData();
      if(fetchedData){

        const filteredData = fetchedData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setData(filteredData)
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
    if (AddEditMenuRef.current) {
      const validation = await AddEditMenuRef.current.formSubmit();
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
          EditConfirm({ collection: 'Menu', id: initialValues.id, data: tempData, updateTable, handleCloseDrawer,has_files:true, fileList:validation.data.raw_imgs, initImgList: initialValues.image_files });
        } else {
          AddConfirm({ collection: 'Menu', data: tempData, updateTable, handleCloseDrawer,dataPrefix:'MN',has_files:true, fileList:validation.data.raw_imgs});
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
    
    const categOption = await fetchCategoryOption();
    setCategoryOption(categOption)
    const hasCateg = Object.keys(categOption).length;
    if(hasCateg){
      setDrawerTitle('Add Category');
      setDrawerButton('Submit');
      setIsUpdate(false);
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
      setIsUpdate(true);
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
            <Tabletop onSearch={handleSearch}/>
            <div className="table-responsive">
              <Table
                columns={columns}
                data={data}
                reloadTable={refreshTable}
                collectionName="Menu"
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
            <AddEditMenu
              initialValues={initialValues}
              ref={AddEditMenuRef}
              categoryOption={categoryOption}
              isUpdate={isUpdate}
              isOpened={openDrawer}
            />
          }
          closable={false}
          close={handleCloseDrawer}
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
export default ManageMenu;
