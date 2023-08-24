import React,{useState} from "react";
import MenuItems from "./MenuItems";
import MenuCheckout from "./MenuCheckout";

import productsJson from "../../../assets/jsons/productsJson.json"

const MenuList = () => {
  
  const [products, setProducts] = useState(productsJson);

  return (
    <>
      <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-8 col-sm-12 ">
                <MenuItems dataSource={products}/>
              </div>
              <div className="col-lg-4 col-sm-12 ">
                <MenuCheckout/>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default MenuList;
