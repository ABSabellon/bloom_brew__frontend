import React, { useState } from "react";
import { Form } from "antd";
import IconMap from "../iconMap/IconMap";
import Inputs from "../forms/inputs";


  const Tabletop = ({ onSearch }) => {

  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearch(query); // Call the onSearch callback with the search query
  };

    return (
      <div className="table-top row">
        <div className="col-4">
          <Form size="large" name="user_login" className="row ogin-form" layout="vertical">
            <Form.Item name="search">
                <Inputs type="text" label="search" prefix={IconMap('BiSearchAlt',null,null,20)} placeholder="Search products" name="search" onChange={handleInputChange} required={true} />
            </Form.Item>
          </Form>
        </div>

      </div>
    );
  };

export default Tabletop;
