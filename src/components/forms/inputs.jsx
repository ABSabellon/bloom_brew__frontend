import React,{useEffect,useState} from "react";
// import IconMap from "../icons/IconMap";
import { AutoComplete,Input,Select,DatePicker, InputNumber } from 'antd';
import {Form,Button,Spinner } from 'react-bootstrap';
import Select2 from 'react-select2-wrapper';

const Inputs = ({url,data, target, style, value, onChange, onKeyDown,
  label, id, type, icon, placeholder, required, tooltip, name, isabled,
  errorType, errorText, format, controlId,loading, option,addonBefore,
  pattern, readOnly, disabledDate,prefix
  
}) => {

  
  const [focus, setFocus] = useState(false);

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);
  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
  const requiredMark = required ? <span className="text-danger">*</span> : null;
  const hasAddonBefore = addonBefore ? "with-addon" : ""
  const hasPrefix = prefix ? "with-prefix" : ""

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
          readOnly={readOnly}
          defaultValue={value} 
          pattern={pattern}
          addonBefore={addonBefore}
          prefix={prefix} 
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
          readOnly={readOnly}
          onChange={onChange} 
          prefix={prefix} 
          addonBefore={addonBefore}
          />
      );

    }
    case "price":{
      return(
        <InputNumber 
          id={id}
          value={value}
          required={required} 
          readOnly={readOnly}
          onChange={onChange} 
          prefix={prefix} 
          addonBefore={addonBefore}
          style={{ width: '100%' }} 
        />
      );
    }
    case "select":{
      return(
        <Select
          showSearch
          required={required}
          readOnly={readOnly}
          onChange={onChange}
          prefix={prefix} 
          addonBefore={addonBefore}
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
    case "datepicker":{
      return(
        <DatePicker
          style={{ width: '100%' }} 
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          placeholder=""
          disabledDate={disabledDate}
          prefix={prefix} 
          addonBefore={addonBefore}
        />
      );
    }
    case "autocomplete":{   
      
      return (
        <AutoComplete
          value={value}
          options={option}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
          prefix={prefix} 
          addonBefore={addonBefore}
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
          required={required}
          readOnly={readOnly}
          prefix={prefix} 
          addonBefore={addonBefore}
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
        <Input 
          onChange={onChange} 
          type={type} 
          readOnly={readOnly}
          required={required}
          defaultValue={value} 
          prefix={prefix} 
          addonBefore={addonBefore}
          />
      );
    }
  }

  }

  return(

    <div
    className={`float-label ${hasAddonBefore} ${hasPrefix} `}
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
