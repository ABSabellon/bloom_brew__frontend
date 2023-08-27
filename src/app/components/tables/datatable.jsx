import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import "../../EntryFile/antd.css";
import DataService from "../../EntryFile/Services/DataService";
import IconMap from "../iconMap/IconMap";
import DeleteConfirm from "../confirm/deleteConfirm";

const Datatable = ({ dataSource, props, columns, reloadTable, query=null, operator=null,value=null}) => {
  const dataS = new DataService(dataSource);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (pageNumber, pageSize) => {
    setIsLoading(true);
    try {
      let queryToUse = null;
  
      if (query && operator && value) {
        queryToUse = dataS.createWhereQuery(query, operator, value);
      }
  
      const fetchedData = await dataS.getAll(queryToUse || query);
      if (fetchedData) {
        setData(fetchedData);
  
        const totalCount = await dataS.getTotalCount();
  
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: totalCount,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, [reloadTable]);

  const onSelectChange = async(newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const deleteMultipleData = async (selectedData)=>{
    if (selectedData.length > 0){

      const confirmed = await DeleteConfirm({ collection:'Categories',record:selectedData});
      if(confirmed){
        reloadTable(true);
      }
    }
  }


  useEffect(() => {
    setIsTrashActive(selectedRowKeys.length > 0);
  }, [selectedRowKeys]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
    fetchData(newPagination.current, newPagination.pageSize);
  };

  return (
    <>
      <div className="ps-3">
        
        
        <a onClick={() => { deleteMultipleData(selectedRowKeys)}}>
          {IconMap("FiTrash2", isTrashActive ? "text-danger" : "text-disabled", null, 24)}
        </a>
      
      </div>
      <Table
        key={props}
        className="table datanew dataTable no-footer"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={isLoading ? { indicator: <Spin /> } : false}
        pagination={{
          ...pagination,
          showTotal: (total, range) =>
            ` ${range[0]} to ${range[1]} of ${total} items`,
        }}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Datatable;
