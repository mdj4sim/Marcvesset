import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

// pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Ticket from "./pages/Ticket";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import LoginSignup from "./pages/LoginSignup";
import LoggedIn from "./pages/LoggedIn";
import Orders from "./pages/Orders";
import AdminAdd from "./pages/AdminAdd";
import AdminLogin from "./pages/AdminLogin";

function App() {
  // all properties
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // just store login creds and navigate to /user/account adn fetch accordingly

  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData?.accountType === "Admin") setIsAdmin(true);
    if (userData?.accountType === "Admin") navigate("/adminController");
    // console.log(isAdmin, "app");
    setToken(userData?.token);
    // console.log(token);
  }, [isAdmin, token]);

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact isAdmin={isAdmin} />} />

        <Route
          path="/shop"
          element={
            <Shop
              cartItem={cartItem}
              setCartItem={setCartItem}
              isAdmin={isAdmin}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItem={cartItem}
              setCartItem={setCartItem}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/ticket"
          element={
            <Ticket
              cartItem={cartItem}
              setCartItem={setCartItem}
              isAdmin={isAdmin}
            />
          }
        />
        <Route
          path="/adminController"
          element={<AdminAdd isAdmin={isAdmin} />}
        />
        <Route path="/userls" element={<LoginSignup />} />
        <Route path="/user" element={<LoggedIn />} />
        <Route path="/user/orders" element={<Orders />} />
        <Route
          path="/admin/login"
          element={<AdminLogin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
      </Routes>
    </>
  );
}

export default App;
