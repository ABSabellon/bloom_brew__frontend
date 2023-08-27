import React, {useState} from "react";
import CoffeeCard from "../../components/productCards/coffeeCard";
import MenuCategories from "../../components/headers/menuCategories/menuCategories";
import {
  Product29   
  } from "../../components/imagePath/imagePath";
import productsJson from "../../../assets/jsons/productsJson.json"

const Posleft = () => {
  const [products, setProducts] = useState(productsJson);
  
  return (
    <div className="col-lg-9 col-sm-12 tabs_wrapper">
      <div className="page-header">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage your purchases</h6>
        </div>
      </div>
      <MenuCategories />
      <div className="tabs_container">
        <div className="tab_content active" data-tab="fruits">
          <div className="row">
            {products.map((product) => (
              <div className="col-xl-4 col-md-6 d-flex" key={product.id}>
                <CoffeeCard
                  id={product.id}
                  name={product.name}
                  ingredients={product.ingredients}
                  details={product.details}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posleft;
