import React,{useEffect,useState} from "react";
// import IconMap from "../icons/IconMap";
import { AutoComplete, Input, Select } from 'antd';
import {Form,Button,Spinner } from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';

const Inputs = ({url,data, target, style, value, onChange, onKeyDown,
  label, id, type, icon, placeholder, required, tooltip, name, isabled,
  errorType, errorText, format, controlId,loading, option,prefix, pattern
  
}) => {

  
  const [focus, setFocus] = useState(false);

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);
  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const hasPrefix = prefix ? "with-addon" : ""

  const inputChosen = (type) =>{

  switch (type) {
    case "text":{
      return(
        <Input 
          id={id}
          type={type}
          value={value}
          required={required} 
          onChange={onChange} 
          // defaultValue={value} 
          pattern={pattern}
          addonBefore={prefix}
          />
      );

    }
    case "password":{
      return(
        <Input.Password 
          id={id}
          type={type}
          value={value}
          required={required} 
          onChange={onChange} 
          />
      );

    }
    case "phone":{
      return(
        <Input
          addonBefore={prefix}
          id={id}
          type={type}
          value={value}
          required={required} 
          onChange={onChange} 
          defaultValue={value} 
        />
      );
    }
    case "select":{
      return(
        <Select
          showSearch
          onChange={onChange}
          filterOption={(inputValue, option) =>
            option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
        >
          {option.map((opt) => (
            <Option key={opt.id} value={opt.value}>
              {opt.value}
            </Option>
          ))}
        </Select>
      );
    }
    case "autocomplete":{   
      
      return (
        <AutoComplete
          value={value}
          options={option}
          onChange={onChange}
          filterOption={(inputValue, option) => {
            if (option && option.value) {
              return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
            }
          }}
        >
        </AutoComplete>
      );
    }
    case "grouped-autocomplete":{
      return (
        <AutoComplete
          value={value}
          options={option}
          onChange={onChange}
          filterOption={
            (inputValue, option) => {
              if (option && option.options) {
                const matches = option.options.map(item =>
                  item.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                );
                return matches.some(match => match); 
              }
            }
          }
        />
      );
    }
    case "email": {
      return(
        <Input onChange={onChange} type={type} defaultValue={value} />
      );
    }
  }

  }

  return(

    <div
    className={`float-label ${hasPrefix}`}
    onBlur={() => setFocus(false)}
    onFocus={() => setFocus(true)}
    required={required}
  >
    {inputChosen(type)}
    <label className={labelClass}>
      {isOccupied ? label : placeholder} {requiredMark}
    </label>
  </div>
  );

};


export default Inputs;
