import React from 'react';

// import { } from 'react-icons/md';
import { FaCodepen } from 'react-icons/fa';
// import {  } from 'react-icons/rx';
import { AiOutlinePlusSquare, AiOutlineGold, AiOutlineShopping } from 'react-icons/ai';
// import {  } from 'react-icons/bs';
import {BiFoodMenu,BiSolidEdit } from 'react-icons/bi';
// import {  } from 'react-icons/tb';
// import {  } from 'react-icons/im';
import { FiDatabase,FiLogOut } from 'react-icons/fi';
// import {  } from 'react-icons/tfi';
// import {  } from 'react-icons/vsc';
// import {  } from 'react-icons/hi';
// import { } from 'react-icons/io'
// import {  } from 'react-icons/ti'
// import {  } from 'react-icons/gi';
import {BsPhone,BsPeople } from 'react-icons/bs';
import{ LuLayoutDashboard, LuFileText} from 'react-icons/lu';
import{ CiShoppingBasket } from 'react-icons/ci'
import{ FaUsersCog, FaUserCog,FaCog } from 'react-icons/fa'

const IconMap = (iconName, classnames = '', iconStyle = {}, size) => {
  // let size = 20;
  let icon = null;
  switch(iconName) {
    //Main
    case 'LuLayoutDashboard': {
      icon = <LuLayoutDashboard className={classnames} size={size} style={iconStyle} /> //dashboard tab
    break;}
    case 'BiFoodMenu': {
      icon = <BiFoodMenu className={classnames} size={size} style={iconStyle} /> //menu tab
    break;}
    case 'BsPhone': {
      icon = <BsPhone className={classnames} size={size} style={iconStyle} /> //applications tab
    break;}

    //Manage Products
    case 'BiSolidEdit': {
      icon = <BiSolidEdit className={classnames} size={size} style={iconStyle} /> //manage tab
    break;}
    case 'AiOutlinePlusSquare': {
      icon = <AiOutlinePlusSquare className={classnames} size={size} style={iconStyle} /> //create product tab
    break;}
    case 'FaCodepen': {
      icon = <FaCodepen className={classnames} size={size} style={iconStyle} /> //categories tab
    break;}

    //Manage Inventory
    case 'AiOutlineShopping': {
      icon = <AiOutlineShopping className={classnames} size={size} style={iconStyle} /> //Purchase tab
    break;}
    case 'CiShoppingBasket': {
      icon = <CiShoppingBasket className={classnames} size={size} style={iconStyle} /> //Stocks tab
    break;}

    //Sales reports
    case 'LuFileText': {
      icon = <LuFileText className={classnames} size={size} style={iconStyle} /> //Invoice Reports tab
    break;}
    case 'FiDatabase': {
      icon = <FiDatabase className={classnames} size={size} style={iconStyle} /> //Inventory Reports tab
    break;}
    case 'AiOutlineGold': {
      icon = <AiOutlineGold className={classnames} size={size} style={iconStyle} /> //suppliers Reports tab
    break;}

    //Manage People
    case 'FaUsersCog': {
      icon = <FaUsersCog className={classnames} size={size} style={iconStyle} /> //Suppliers tab
    break;}
    case 'FaUserCog': {
      icon = <FaUserCog className={classnames} size={size} style={iconStyle} /> //User tab
    break;}

    //Settings
    case 'FaCog': {
      icon = <FaCog className={classnames} size={size} style={iconStyle} /> //Settings tab
    break;}
    case 'FiLogOut': {
      icon = <FiLogOut className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}

    
  }
  return icon;
};

export default IconMap;