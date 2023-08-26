import React from 'react';

import { MdOutlineDeleteForever } from 'react-icons/md';
import { FaCodepen } from 'react-icons/fa';
// import {  } from 'react-icons/rx';
import { AiOutlinePlusSquare, AiOutlineGold, AiOutlineShopping,AiFillFire, 
  AiOutlineEye,AiOutlinePlus,AiOutlinePlusCircle,AiOutlineEdit,AiOutlineInbox
} from 'react-icons/ai';
// import {  } from 'react-icons/bs';
import { BiFoodMenu,BiSolidEdit,BiSearchAlt,BiBowlHot,BiSolidCoffeeTogo 
} from 'react-icons/bi';
import { TbCurrencyPeso } from 'react-icons/tb';
// import {  } from 'react-icons/im';
import { FiDatabase,FiLogOut,FiEdit2,FiTrash2 } from 'react-icons/fi';
// import {  } from 'react-icons/tfi';
// import {  } from 'react-icons/vsc';
// import {  } from 'react-icons/hi';
// import { } from 'react-icons/io'
// import {  } from 'react-icons/ti'
// import {  } from 'react-icons/gi';
import{ BsPhone,BsPeople,BsSnow2,BsArrow90DegRight,BsDownload } from 'react-icons/bs';
import{ LuLayoutDashboard, LuFileText, LuFlame} from 'react-icons/lu';
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
    case 'BiSolidCoffeeTogo': {
      icon = <BiSolidCoffeeTogo className={classnames} size={size} style={iconStyle} /> //categories tab
    break;}
  

    //Manage Inventory
    case 'AiOutlineShopping': {
      icon = <AiOutlineShopping className={classnames} size={size} style={iconStyle} /> //Purchase tab
    break;}
    case 'CiShoppingBasket': {
      icon = <CiShoppingBasket className={classnames} size={size} style={iconStyle} /> //Stocks tab
    break;}
    case 'BiBowlHot': {
      icon = <BiBowlHot className={classnames} size={size} style={iconStyle} /> //Stocks tab
    break;}
    case 'AiOutlineInbox': {
      icon = <AiOutlineInbox className={classnames} size={size} style={iconStyle} /> //Stocks tab
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

    //action icons
    case 'AiOutlineEye': {
      icon = <AiOutlineEye className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'AiOutlinePlus': {
      icon = <AiOutlinePlus className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'FiEdit2': {
      icon = <FiEdit2 className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'AiOutlineEdit': {
      icon = <AiOutlineEdit className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}AiOutlineEdit
    case 'TbCurrencyPeso': {
      icon = <TbCurrencyPeso className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'AiOutlinePlusCircle': {
      icon = <AiOutlinePlusCircle className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'BsDownload': {
      icon = <BsDownload className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'MdOutlineDeleteForever': {
      icon = <MdOutlineDeleteForever className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'FiTrash2': {
      icon = <FiTrash2 className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    case 'BiSearchAlt': {
      icon = <BiSearchAlt className={classnames} size={size} style={iconStyle} /> //Logout tab
    break;}
    
    //etc
    case 'AiFillFire': {
      icon = <AiFillFire className={classnames} size={size} style={iconStyle} />
    break;}
    case 'BsSnow2': {
      icon = <BsSnow2 className={classnames} size={size} style={iconStyle} />
    break;}
    case 'LuFlame': {
      icon = <LuFlame className={classnames} size={size} style={iconStyle} />
    break;}
    case 'BsArrow90DegRight': {
      icon = <BsArrow90DegRight className={classnames} size={size} style={iconStyle} />
    break;}
    

    
  }
  return icon;
};

export default IconMap;