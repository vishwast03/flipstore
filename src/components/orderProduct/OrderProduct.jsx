import React from "react";
import moment from "moment";
import currency from "currency.js";
import "./OrderProduct.css";

const OrderProduct = (props) => {
  const { timestamp, price, orderId, image, title } = props;
  const INR = (value) => currency(value, { symbol: "₹", precision: 2 });

  return (
    <div className="orderProduct">
      <div className="orderProduct_top">
        <div className="orderProduct_topLeft">
          <div className="orderProduct_dateContainer">
            <span>ORDER PLACED</span>
            <span className="orderProduct_dateTime">
              {moment(timestamp).format("D MMM YYYY, h:mm A")}
            </span>
          </div>

          <div className="orderProduct_amount">
            <span>TOTAL</span>
            <span className="orderProduct_total">
              {INR(price).format(true)}
            </span>
          </div>
        </div>

        <div className="orderProduct_topRight">
          <div className="orderProduct_orderId">{`ORDER # ${orderId}`}</div>
        </div>
      </div>

      <div className="orderProduct_bottom">
        <img src={image} alt="" className="orderProduct_image" />

        <div className="orderProduct_title">{title}</div>
      </div>
    </div>
  );
};

export default OrderProduct;
