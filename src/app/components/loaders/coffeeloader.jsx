import React,{useState} from "react";
import { CoffeeSteaming } from "../../components/imagePath/imagePath";
const CoffeeLoader = () => {
  
  return (
    <>
    <div className="coffee-steamy-loader">
      <div className="svg-wrapper">
          
          <img src={CoffeeSteaming} alt="img" />
        </div>
      </div>
    </>
  );
};

export default CoffeeLoader;
