import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_public_key");

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // Custom authentication to check if the user is logged in
    const checkUserStatus = async () => {
      try {
        const response = await fetch("/api/auth/status", { credentials: "include" });
        const data = await response.json();
        
        if (data.loggedIn) {
          dispatch({
            type: "SET_USER",
            user: data.user, // Assuming your backend sends the user info here
          });
        } else {
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };
    
    checkUserStatus();
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <ConditionalHeader />
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  const showHeader = location.pathname === "/checkout" || location.pathname === "/" || location.pathname === "/orders";
  
  return showHeader ? <Header /> : null;
}

export default App;
