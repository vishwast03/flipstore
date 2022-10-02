import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import Checkout from "./pages/checkout/Checkout";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./context/StateProvider";
import Register from "./pages/register/Register";
import Payment from "./pages/payment/Payment";
import Orders from "./pages/orders/Orders";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    onAuthStateChanged(auth, (user) => {
      console.log("THE USER IS >>> ", user);

      if (user) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: user,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
