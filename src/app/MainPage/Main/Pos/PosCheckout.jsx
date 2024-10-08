import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "react-select2-wrapper/css/select2.css";
import { 
  Product34,
  wallet1,
  transcation,
  trash12,
  scan,
  Edit6,
  pause1,
  debitcard,
  cash,  
  Product30,
  Product31,
  Product35,
  delete2,
  ellipise1,
  scanner1,
} from "../../../components/imagePath/imagePath";

const MenuCheckout = () => {
  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  const options = [
    { id: 1, text: "Walk-in Customer", text: "Walk-in Customer" },
    { id: 2, text: "Chris Moris", text: "Chris Moris" },
  ];
  const options1 = [
    { id: 1, text: "Product", text: "Product" },
    { id: 2, text: "Barcode", text: "Barcode" },
  ];
  const options2 = [
    { id: 1, text: "Exclusive", text: "Exclusive" },
    { id: 2, text: "Inclusive", text: "Inclusive" },
  ];
  return (
    <>
    <div className="order-list">
      <div className="orderid">
        <h4>Order List</h4>
        <h5>Transaction id : #65565</h5>
      </div>
    </div>
    <div className="card card-order">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group w-100 mb-0">
              <label>Customer Name</label>
              <input type="text"/>
            </div>
          </div>
        </div>
      </div>
      <div className="split-card"></div>
      <div className="card-body pt-0">
        <div className="totalitem">
          <h4>Total items : 4</h4>
          <Link to="#">Clear all</Link>
        </div>
        <div className="product-table">
          <ul className="product-lists">
            <li>
              <div className="productimg">
                <div className="productimgs">
                  <img src={Product30} alt="img" />
                </div>
                <div className="productcontet">
                  <h4>Pineapple</h4>
                  <div className="productlinkset">
                    <h5>PT001</h5>
                  </div>
                  <div className="increment-decrement">
                    <div className="input-groups">
                      <input
                        onClick={() => setCounter(counter - 1)}
                        type="button"
                        defaultValue="-"
                        className="button-minus dec button"
                      />
                      <input
                        type="text"
                        name="child"
                        value={counter} 
                        readOnly
                        className="quantity-field"
                      />
                      <input
                        onClick={() => setCounter(counter + 1)}
                        type="button"
                        defaultValue="+"
                        className="button-plus inc button "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>3000.00 </li>
            <li>
              <Link
                to="#"
                className="confirm-text"
                onClick={confirmText}
              >
                <img src={delete2} alt="img" />
              </Link>
            </li>
          </ul>
          <ul className="product-lists">
            <li>
              <div className="productimg">
                <div className="productimgs">
                  <img src={Product34} alt="img" />
                </div>
                <div className="productcontet">
                  <h4>Green Nike</h4>
                  <div className="productlinkset">
                    <h5>PT001</h5>
                  </div>
                  <div className="increment-decrement">
                    <div className="input-groups">
                      <input
                        onClick={() => setCounter1(counter1 - 1)}
                        type="button"
                        defaultValue="-"
                        className="button-minus dec button"
                      />
                      <input
                        type="text"
                        name="child"
                        value={counter1}
                        readOnly
                        className="quantity-field"
                      />
                      <input
                        onClick={() => setCounter1(counter1 + 1)}
                        type="button"
                        defaultValue="+"
                        className="button-plus inc button "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>3000.00 </li>
            <li>
              <Link
                to="#"
                className="confirm-text"
                onClick={confirmText}
              >
                <img src={delete2} alt="img" />
              </Link>
            </li>
          </ul>
          <ul className="product-lists">
            <li>
              <div className="productimg">
                <div className="productimgs">
                  <img src={Product35} alt="img" />
                </div>
                <div className="productcontet">
                  <h4>Banana</h4>
                  <div className="productlinkset">
                    <h5>PT001</h5>
                  </div>
                  <div className="increment-decrement">
                    <div className="input-groups">
                      <input
                        onClick={() => setCounter2(counter2 - 1)}
                        type="button"
                        defaultValue="-"
                        className="button-minus dec button"
                      />
                      <input
                        type="text"
                        name="child"
                        value={counter2}
                        readOnly
                        className="quantity-field"
                      />
                      <input
                        onClick={() => setCounter2(counter2 + 1)}
                        type="button"
                        defaultValue="+"
                        className="button-plus inc button "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>3000.00 </li>
            <li>
              <Link
                to="#"
                className="confirm-text"
                onClick={confirmText}
              >
                <img src={delete2} alt="img" />
              </Link>
            </li>
          </ul>
          <ul className="product-lists">
            <li>
              <div className="productimg">
                <div className="productimgs">
                  <img src={Product31} alt="img" />
                </div>
                <div className="productcontet">
                  <h4>Strawberry</h4>
                  <div className="productlinkset">
                    <h5>PT001</h5>
                  </div>
                  <div className="increment-decrement">
                    <div className="input-groups">
                      <input
                        onClick={() => setCounter3(counter3 - 1)}
                        type="button"
                        defaultValue="-"
                        className="button-minus dec button"
                      />
                      <input
                        type="text"
                        min={0}
                        name="child"
                        value={counter3}
                        readOnly
                        className="quantity-field"
                      />
                      <input
                        onClick={() => setCounter3(counter3 + 1)}
                        type="button"
                        defaultValue="+"
                        className="button-plus inc button "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>3000.00 </li>
            <li>
              <Link
                to="#"
                className="confirm-text"
                onClick={confirmText}
              >
                <img src={delete2} alt="img" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="split-card"></div>
      <div className="card-body pt-0 pb-2">
        <div className="setvalue">
          <ul>
            <li>
              <h5>Subtotal </h5>
              <h6>&#8369;55.00</h6>
            </li>
            <li>
              <h5>Tax </h5>
              <h6>&#8369;5.00</h6>
            </li>
            <li className="total-value">
              <h5>Total</h5>
              <h6>&#8369;60.00</h6>
            </li>
          </ul>
        </div>
        <div className="setvaluecash">
          <ul>
            <li>
              <Link to="#" className="paymentmethod">
                <img src={cash} alt="img" className="me-2" />
                Cash
              </Link>
            </li>
            <li>
              <Link to="#" className="paymentmethod">
                <img src={debitcard} alt="img" className="me-2" />
                Debit
              </Link>
            </li>
            <li>
              <Link to="#" className="paymentmethod">
                <img src={scan} alt="img" className="me-2" />
                E-Wallet
              </Link>
            </li>
          </ul>
        </div>
        <div className="btn-totallabel">
          <h5>Checkout</h5>
          <h6>&#8369;60.00</h6>
        </div>
        <div className="btn-pos">
          <ul>
            <li>
              <Link to="#" className="btn">
                <img src={pause1} alt="img" className="me-1" />
                Hold
              </Link>
            </li>
            <li>
              <Link to="#" className="btn">
                <img src={Edit6} alt="img" className="me-1" />
                Quotation
              </Link>
            </li>
            <li>
              <Link to="#" className="btn">
                <img src={trash12} alt="img" className="me-1" />
                Void
              </Link>
            </li>
            <li>
              <Link to="#" className="btn">
                <img src={wallet1} alt="img" className="me-1" />
                Payment
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#recents"
              >
                <img src={transcation} alt="img" className="me-1" />{" "}
                Transaction
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default MenuCheckout;
