import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
// import "../../EntryFile/antd.css";
import 'antd/dist/reset.css'
import IconMap from "../iconMap/IconMap";
import Swal from "sweetalert2";
import DeleteConfirm from "../confirm/deleteConfirm";
import DataService from "../../EntryFile/Services/DataService";

const Datatable = ({ collectionName, props, columns, data,reloadTable  }) => {
  const dataS = new DataService(collectionName);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [localLoader, setLocalLoader] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('newSelectedRowKeys :: ', newSelectedRowKeys)
  };

  const deleteMultipleData = async (selectedData) => {
    if (selectedData.length > 0) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFC107',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          icon: 'swal2-icon', // Apply the custom CSS class to the icon
        },
      }).then(async (result) => {
        try{
          if (result.isConfirmed) {
            
            const deleteData = await dataS.delete(selectedData)
    
            if(deleteData){
              Swal.fire(
                'Deleted!',
                `${collectionName}/s has been deleted.`,
                'success'
              ).then(()=>{
                console.log('confirmed !!!')
                setLocalLoader(true);
                setTimeout(() => setLocalLoader(false), 0);
              })
            }else{
              // console.error('Failed to delete:', error);
              Swal.fire({
                type: 'error',
                title: 'Error',
                text: `Data not found in the server`,
              });
            }
          }
        }catch(error){
          console.error('Failed to delete:', error);
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: `Failed to delete ${collectionName}. Please try again later. Or contact support if error persist`,
          });
    
        }
      });
    }
  };

  useEffect(() => {
    setIsTrashActive(selectedRowKeys.length > 0);
  }, [selectedRowKeys]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    // Handle pagination change here if needed
  };

  return (
    <>
      <div className="ps-3">
        <a onClick={() => deleteMultipleData(selectedRowKeys)}>
          {IconMap("FiTrash2", isTrashActive ? "text-danger" : "text-disabled", null, 24)}
        </a>
      </div>
      <Table
        key={props}
        className="table datanew dataTable no-footer"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data} // Using the data prop passed from the parent
        loading={reloadTable || localLoader} 
        pagination={{
          ...pagination,
          showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total} items`,
        }}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Datatable;
