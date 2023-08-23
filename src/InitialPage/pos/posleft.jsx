import React from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import CoffeeCard from "../../components/productCards/coffeeCard";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
    Product61,    
    Product62,
    Product63,
    Product64,
    Product65,
    Product66,
    Product67,
    Product68,
    Product29,    
    Product31,
    Product35,
    Product37,
    Product54,
    Product44,
    Product45,
    Product36,
    Product32,
    Product46,
    Product55,
    Product60,
    Product56,
    Product47,
    Product48,
    Product57,
    Product58,
    Product49,
    Product51,
    Product52,
    Product53,    
  } from "../../EntryFile/imagePath";

const Posleft = () => {
  return (
    <div className="col-lg-9 col-sm-12 tabs_wrapper">
      <div className="page-header ">
        <div className="page-title">
          <h4>Categories</h4>
          <h6>Manage your purchases</h6>
        </div>
      </div>
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
      <div className="tabs_container">
        <div className="tab_content active" data-tab="fruits">
          <div className="row ">
            <div className="col-xl-4 col-md-6 d-flex ">
              <CoffeeCard></CoffeeCard>
            </div>
            <div className="col-xl-4 col-md-6 d-flex ">
              <CoffeeCard></CoffeeCard>
            </div>
            <div className="col-xl-4 col-md-6 d-flex ">
              <CoffeeCard></CoffeeCard>
            </div>
            <div className="col-xl-4 col-md-6 d-flex ">
              <CoffeeCard></CoffeeCard>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="headphone">
          <div className="row ">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product44} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product45} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product36} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="Accessories">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product32} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Accessories</h5>
                  <h4>Sunglasses</h4>
                  <h6>15.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product46} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Accessories</h5>
                  <h4>Pendrive</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product55} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Accessories</h5>
                  <h4>Mouse</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="Shoes">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product60} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Shoes</h5>
                  <h4>Red nike</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="computer">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product56} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Computers</h5>
                  <h4>Desktop</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="Snacks">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product47} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Snacks</h5>
                  <h4>Duck Salad</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product48} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Snacks</h5>
                  <h4>Breakfast board</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product57} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Snacks</h5>
                  <h4>California roll</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product58} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Snacks</h5>
                  <h4>Sashimi</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="watch">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product49} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h4>Watch</h4>
                  <h5>Watch</h5>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product51} alt="img" />
                  <h6>Qty: 1.00</h6>
                </div>
                <div className="productsetcontent">
                  <h4>Watch</h4>
                  <h5>Watch</h5>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="cycle">
          <div className="row">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product52} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h4>Cycle</h4>
                  <h5>Cycle</h5>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product53} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h4>Cycle</h4>
                  <h5>Cycle</h5>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="fruits1">
          <div className="row ">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product29} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Fruits</h5>
                  <h4>Orange</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product31} alt="img" />
                  <h6>Qty: 1.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Fruits</h5>
                  <h4>Strawberry</h4>
                  <h6>15.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product35} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Fruits</h5>
                  <h4>Banana</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product37} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Fruits</h5>
                  <h4>Limon</h4>
                  <h6>1500.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab_content" data-tab="headphone1">
          <div className="row ">
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product44} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product45} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 d-flex ">
              <div className="productset flex-fill">
                <div className="productsetimg">
                  <img src={Product36} alt="img" />
                  <h6>Qty: 5.00</h6>
                  <div className="check-product">
                    <i className="fa fa-check" />
                  </div>
                </div>
                <div className="productsetcontent">
                  <h5>Headphones</h5>
                  <h4>Earphones</h4>
                  <h6>150.00</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posleft;
