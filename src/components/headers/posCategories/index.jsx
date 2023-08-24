import React from "react";
import { Link } from "react-router-dom"; 
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const PosCategories = () =>{
  return(
    <ul className=" tabs owl-carousel owl-theme owl-product  border-0 ">
      <OwlCarousel
        className="owl-theme"
        items={7}
        margin={10}
        dots={false}
        nav
      >
        <li id="fruits" className="item active">
          <div className="product-details ">
            <span>☕</span>
            <h6>Espresso Drinks</h6>
          </div>
        </li>
        <li id="headphone" className="item">
          <div className="product-details ">
            <span>☕</span>
            <h6>Non-coffee Latte</h6>
          </div>
        </li>
        <li id="Accessories" className="item">
          <div className="product-details">
            <span>🍹</span>
            <h6>Fresh Fruit Shake</h6>
          </div>
        </li>
        <li id="Shoes" className="item">
          <Link to="#" className="product-details">
            <span>🍹</span>
            <h6>Coffee Frappe</h6>
          </Link>
        </li>
        <li id="computer" className="item">
          <Link to="#" className="product-details">
            <span>🧋</span>
            <h6>Non-Coffee Frappe</h6>
          </Link>
        </li>
        <li id="Snacks" className="item">
          <Link to="#" className="product-details">
            <span>🧋</span>
            <h6>Fizzy Refresher</h6>
          </Link>
        </li>
        <li id="watch" className="item">
          <Link to="#" className="product-details">
            <span>🍛</span>
            <h6>All Day BFast</h6>
          </Link>
        </li>
        <li id="cycle" className="item">
          <Link to="#" className="product-details">
            <span>🍟</span>
            <h6>Snacks</h6>
          </Link>
        </li>
        <li id="fruits1" className="item">
          <div className="product-details ">
            <span>🥪</span>
            <h6>Grilled Sandwiches</h6>
          </div>
        </li>
      </OwlCarousel>
    </ul>   
  );
}


export default PosCategories;