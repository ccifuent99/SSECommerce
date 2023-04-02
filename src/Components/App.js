import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Register from "./CreateAccount";
import Plants from "./Plants";
import PlantCard from "./PlantPDP";
import DisplayOrders from "./Orders";
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import ProductUpdate from "./ProductUpdate";
import ProfileCard from "./ProfileCard";
import OrderSuccess from "./OrderSuccess";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, logout, fetchOnlineUsers } from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchCart());
  }, []);

  useEffect(() => {
    dispatch(fetchCart());
    if (auth.id) {
      dispatch(fetchOnlineUsers());
    }
    setUsername(auth.username);
  }, [auth]);

  useEffect(() => {
    setCount(
      cart.lineItems.reduce((accum, elem) => {
        return accum + elem.quantity;
      }, 0)
    );
  }, [cart]);

  const toggleLogin = () => {
    if (!auth.id) {
      navigate("/login");
    } else {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="App">
      <header>
        <h1 onClick={() => navigate("/")}>
          <img className="navLogo" src="./static/navLogo.png" />
        </h1>

        <div>
          <div>
            <div>
              <span className="welcome-text">
                {auth.id ? `Welcome, ${auth.username}!` : null}
              </span>
              <Link className="button-link" to="/products">
                <span className="button-link">PRODUCTS</span>
              </Link>
              <Link className="button-link" to="/cart">
                <span className="button-link">CART({count})</span>
              </Link>
              {auth.id && (
                <Link className="button-link" to="/profile">
                  <span className="button-link">PROFILE</span>
                </Link>
              )}
            </div>
          </div>

          {!auth.id ? (
            <span className="button-link" onClick={toggleLogin}>
              Login
            </span>
          ) : (
            <span>
              <span className="button-link" onClick={toggleLogin}>
                Logout
              </span>
            </span>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:canceled" element={<Cart />} />
        <Route path="/products" element={<Plants />} />
        <Route path="/products/:id" element={<PlantCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/CreateAccount" element={<Register />} />
        <Route path="/orders" element={<DisplayOrders />} />
        <Route path="/portal" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminHome />} />
        <Route path="/productupdate" element={<ProductUpdate />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="/auth" element={<ProfileCard />} />
      </Routes>

      <div className={visible ? "bottom-right" : "bottom-right hidden"}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default App;
