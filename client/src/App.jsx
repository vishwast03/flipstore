import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import { SidebarState } from "./context/SidebarContext";
import { CartState } from "./context/CartContext";
import { UserState } from "./context/UserContext";

const App = () => {
  const host = "http://localhost:5000";

  return (
    <UserState>
      <CartState>
        <SidebarState>
          <BrowserRouter>
            <Navbar />
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home host={host} />} />
              <Route path="/login" element={<Login host={host} />} />
              <Route path="/signup" element={<Signup host={host} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </SidebarState>
      </CartState>
    </UserState>
  );
};

export default App;
