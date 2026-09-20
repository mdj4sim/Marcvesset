import React, { act, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../photos/logo.png";

const Navbar = ({ isAdmin }) => {
  const [active, setActive] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   const url = window.location.href;
  //   const lastSlashIndex = url.lastIndexOf("/");
  //   const result = url.substring(lastSlashIndex + 1);
  //   setActive((active) => result);
  //   console.log(result);
  //   console.log(active);
  // }, [active]);

  const clickHandle = () => {
    console.log(window.location.href);
    setActive(
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    );
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className="cross"
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        {isVisible ? "︽" : "︾"}
      </div>
      <div className={"ct-navbar " + (isVisible ? "" : "navHidden")}>
        <div className="ct-nav--logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="ct-nav--links">
          <li>
            <Link
              to="/"
              className={active === "" ? "active" : ""}
              onClick={clickHandle}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={active === "about" ? "active" : ""}
              onClick={clickHandle}
            >
              About
            </Link>
          </li>
          <li className={isAdmin ? "isAdmin-hidden" : ""}>
            <Link
              to="/contact-us"
              className={active === "contact-us" ? "active" : ""}
              onClick={clickHandle}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className={active === ":_id" ? "active" : ""}
              onClick={clickHandle}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/ticket"
              className={active === "ticket" ? "active" : ""}
              onClick={clickHandle}
            >
              Ticket
            </Link>
          </li>
          <li className={isAdmin ? "isAdmin-hidden" : ""}>
            <Link to="/cart" onClick={clickHandle}>
              Cart
            </Link>
          </li>
          <li className={isAdmin ? "isAdmin-visible" : "hidden"}>
            <Link to="/adminController" onClick={clickHandle}>
              Add Items
            </Link>
          </li>
          <li>
            <Link to="/userls" onClick={clickHandle}>
              Account
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Navbar;
