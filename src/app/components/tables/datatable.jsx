import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import "../../EntryFile/antd.css";
import DataService from "../../EntryFile/Services/DataService";

const Datatable = ({ url,dataSource, props, columns, reloadTable}) => {
  const dataS = new DataService(dataSource);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (pageNumber, pageSize) => {
    setIsLoading(true);
    try {
      const deets = await dataS.getAll("name", pageNumber, pageSize, true);
      if (deets) {
        setData(deets.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: deets.docTotal,
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
