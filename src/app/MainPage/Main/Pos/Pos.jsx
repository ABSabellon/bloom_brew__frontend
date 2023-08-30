import React,{useState} from "react";
import MenuItems from "./PosItems";
import MenuCheckout from "./PosCheckout";

import productsJson from "../../../../assets/jsons/productsJson.json"

const Pos = () => {
  
  const [products, setProducts] = useState(productsJson);

  return (
    <>
      <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-8 col-sm-12 tabs_wrapper">
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

export default Pos;
