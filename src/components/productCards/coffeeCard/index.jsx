import React from "react";
import { Link } from "react-router-dom";
import {
    Product29,    
  } from "../../../EntryFile/imagePath";
import IconMap from "../../iconMap";

const CoffeeCard = () => {
  return (
   <>
    <div className="productset flex-fill active">
      <div className="check-product">
        <i className="fa fa-check" />
      </div>
      <div className="row p-3">
        <div className="col-6 productsetimg">
          <div className="row">
            <img src={Product29} alt="img" />
            <div className="increment-decrement">
              <div className="input-groups">
                <input type="button" className="button-minus dec button" value="-"/>
                <input type="text" name="child" className="quantity-field" value="0"/>
                <input type="button" className="button-plus inc button " value="+"/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 productsetcontent">
          <h4>Caramel Frappuccino</h4>
          <div className="product-description">
            <h5>Test description of ingredients if we have some</h5>
          </div>
          <div className="product-price">
            <h6><span>&#8369;</span>150.00</h6>
          </div>
          <div className="product-mood">
            <label><p>Mood</p></label>
            <a className="btn btn-mood active"><span>🔥</span></a>
            <a className="btn btn-mood"><span>❄️</span></a>
          </div>
          
          <div className="add-cart">
            <a className=" btn clip-btn btn-primary w-100">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* <div className="productset flex-fill active">
      <div className="productsetimg">
        <div className="row">
          <h6>Qty: 5.00</h6>
          <div className="check-product">
            <i className="fa fa-check" />
          </div>
          <div className="col-6">
            <img src={Product29} alt="img" />
          </div>
          <div className="col-6">
            <div className="productsetcontent">
              <h4>Caramel Frappuccino</h4>
              <h5>Fruits</h5>
              <h6>150.00</h6>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default CoffeeCard;
