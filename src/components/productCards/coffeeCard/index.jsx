import React,{useState} from "react";
import { Link } from "react-router-dom";
import {
    Product29,    
  } from "../../../EntryFile/imagePath";
import IconMap from "../../iconMap";

const CoffeeCard = () => {
  
  const [counter1, setCounter1] = useState(0);
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
                <input type="button" className="button-minus dec button" value="-" onClick={() => setCounter1(counter1 - 1)}/>
                <input type="text" name="child" className="quantity-field" value={counter1} readOnly/>
                <input type="button" className="button-plus inc button " value="+"onClick={() => setCounter1(counter1 + 1)}/>
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
    </>
  );
};

export default CoffeeCard;
