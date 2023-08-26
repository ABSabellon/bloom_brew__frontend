import React,{useState,useEffect} from "react";
import { Table, Spin } from "antd";
import "../../EntryFile/antd.css";
import { itemRender, onShowSizeChange } from "../pagination";
import Tabletop from "./tabletop";

const Datatable = ({ url, props, columns, dataSource, inputfilter,header }) => {
  const [data, setData ]=useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  useEffect(() => {
    if(dataSource){
      setIsLoading(false)
      setData(dataSource);
    }else if(url){
      // fetchData(url);
    }
  }, [dataSource]);

  return (
    <>
      <Tabletop inputfilter={inputfilter} />
      <Table
        key={props}
        className="table datanew dataTable no-footer"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={isLoading ? { indicator: <Spin /> } : false}
        pagination={{
          total: dataSource.length,
          showTotal: (total, range) =>
            ` ${range[0]} to ${range[1]} of ${total} items`,
          // sshowSizeChanger: true,
          // onShowSizeChange: onShowSizeChange,
        }}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default Datatable;
