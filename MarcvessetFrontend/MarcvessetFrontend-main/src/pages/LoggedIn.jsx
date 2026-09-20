import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) navigate("/userls");
    setUserName(userData?.name);
  }, [userName]);

  return (
    <div className="ct-user--loggedIn">
      <h3>Hey {userName}!</h3>
      <Link to="/user/orders">Orders</Link>
    </div>
  );
};

export default LoggedIn;
