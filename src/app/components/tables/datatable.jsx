import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import "../../EntryFile/antd.css";
import IconMap from "../iconMap/IconMap";
import DeleteConfirm from "../confirm/deleteConfirm";

const Datatable = ({ collectionName, props, columns, data,reloadTable  }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isTrashActive, setIsTrashActive] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const deleteMultipleData = async (selectedData) => {
    if (selectedData.length > 0) {
      const confirmed = await DeleteConfirm({ collection: collectionName, record: selectedData });
      if (confirmed) {
        reloadTable(true);
        // Handle data deletion here, e.g. by updating the parent component's data state
      }
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
        loading={reloadTable} 
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
