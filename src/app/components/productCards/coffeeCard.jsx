import React, { useState } from "react";
import { Link } from "react-router-dom";
// import IconMap from "../iconMap";
import IconMap from "../iconMap/IconMap"
import { Product29 } from "../../components/imagePath/imagePath";

const CoffeeCard = ({ img, id, name, ingredients, price, active }) => {
  const [isActive, setIsActive] = useState(active || false);
  const [counter1, setCounter1] = useState(0);

  const addCart = () => {
    setIsActive(!isActive); // Toggle the active state
  };

  return (
    <>
      <div
        className={isActive? "productset flex-fill active": "productset flex-fill"}>
        <div className="check-product">
          <i className="fa fa-check" />
        </div>
        <div className="row p-3">
          <div className="col-6 productsetimg">
            <div className="row">
              <img src={Product29} alt="img" />
              <div className="increment-decrement">
                <div className="input-groups">
                  <input
                    type="button"
                    className="button-minus dec button"
                    value="-"
                    onClick={() => setCounter1(counter1 - 1)}
                  />
                  <input
                    type="text"
                    name="child"
                    className="quantity-field"
                    value={counter1}
                    readOnly
                  />
                  <input
                    type="button"
                    className="button-plus inc button "
                    value="+"
                    onClick={() => setCounter1(counter1 + 1)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 productsetcontent">
            <h4>{name}</h4>
            <div className="product-price">
              <h6>
                <span>&#8369;</span>
                {price}
              </h6>
            </div>
            <div className="product-mood">
              <a className="btn btn-mood active">
                <span className="active">
                  {IconMap("LuFlame", null, null, 35)}
                </span>
              </a>
              <a className="btn btn-mood">
                <span>{IconMap("BsSnow2", null, null, 35)}</span>
              </a>
            </div>

            <div className="add-cart">
              <a
                className="btn clip-btn btn-primary w-100"
                onClick={() => {
                  addCart();
                }}
              >
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
