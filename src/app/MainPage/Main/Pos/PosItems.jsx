import React,{useState} from "react";
import CoffeeCard from "../../../components/productCards/coffeeCard";
import MenuCategories from "../../../components/headers/menuCategories/menuCategories"

const MenuItems = ({dataSource}) => {
  return (
    <>
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
            {dataSource.map((product, index) => (
              <div className="col-xl-4 col-md-6 d-flex" key={product.id}>
                <CoffeeCard
                  dataSource={dataSource}
                  id={product.id}
                  name={product.name}
                  ingredients={product.ingredients}
                  price={product.details.find((detail) => detail.temp === "hot")?.price || "N/A"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default MenuItems;
