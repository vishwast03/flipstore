import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useStateValue } from "../../context/StateProvider";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import OrderProduct from "../../components/orderProduct/OrderProduct";

const Orders = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const q = query(collection(db, "orders"), where("user_id", "==", user.uid));

    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });

    setOrders(items);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2 className="orders_title">Your Orders</h2>

      {orders.map((order) => (
        <OrderProduct
          key={order.product.id}
          timestamp={order.timestamp}
          price={order.product.price}
          orderId={order.order_id}
          image={order.product.image}
          title={order.product.title}
        />
      ))}
    </div>
  );
};

export default Orders;
