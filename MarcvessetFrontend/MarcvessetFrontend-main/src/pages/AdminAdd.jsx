import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

import test1 from "../photos/match.jpg";
import test2 from "../photos/shop.png";

const AdminAdd = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [shopData, setShopData] = useState({
    name: "",
    price: "",
  });

  const [token1, setToken] = useState("");

  const [ticketData, setTicketData] = useState({
    time: "",
    teamNames: "",
    price: "",
    Date: "",
  });

  const handleClickMerchandise = async () => {
    console.log("Clicked Merchandise");
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/Merchandise/createMerchandise`;
      const data = {
        ...shopData,
        token: token1,
      };

      console.log("Ticket Data ", data);

      const response = await axios.post(url, data);

      console.log("Ticket creation response:", response.data);
      alert("Item Added Successfully");

      // Handle success
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    }
  };

  const handleClickTicket = async () => {
    console.log("Clicked Tickts");

    try {
      // const token1 = await JSON.parse(localStorage.getItem("userData"))?.token;
      const userID = await JSON.parse(localStorage.getItem("userData"))?._id;
      // setTicketData({
      //   ...ticketData,
      //   token: token1,
      //   userId: userId,
      // });

      const data = {
        ...ticketData,
        token: token1,
        userId: userID,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/Tickets/createTickets`,
        data,
        config
      );

      console.log("Ticket creation response:", response.data);
      alert("Ticket created successfully!");
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    }
  };

  const changeHandlerMerchandise = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
    console.log(shopData);
  };

  const changeHandlerTicket = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    console.log(ticketData);
  };

  useEffect(() => {
    if (!isAdmin) navigate("/");
    const fetchToken = async () => {
      const userToken = await JSON.parse(localStorage.getItem("userData"))
        ?.token;
      if (!userToken) {
        alert("Login First");
      } else {
        setToken(userToken);
      }
    };

    fetchToken();
    console.log("controller", isAdmin);
  }, [isAdmin, ticketData, shopData, token1]);

  return (
    <div className="ct-adminCtr">
      <div className="admin-ctr--addShop">
        <img src={test2} alt="merchandise" />
        <div>
          <div className="ct-mCard--details admin-addItem">
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              onChange={changeHandlerMerchandise}
            />
            <input
              type="text"
              name="price"
              placeholder="Enter Product Price"
              onChange={changeHandlerMerchandise}
            />
          </div>
          <button onClick={handleClickMerchandise}>Add to Shop</button>
        </div>
      </div>

      <div className="admin-ctr--addShop">
        <img src={test1} alt="merchandise" />
        <div>
          <div className="ct-mCard--details admin-addItem">
            <input type="date" name="Date" onChange={changeHandlerTicket} />
            <input type="time" name="time" onChange={changeHandlerTicket} />
            <input
              type="text"
              name="teamNames"
              placeholder="Enter Product Name"
              onChange={changeHandlerTicket}
            />
            <input
              type="text"
              name="price"
              placeholder="Enter Product Price"
              onChange={changeHandlerTicket}
            />
          </div>
          <button onClick={handleClickTicket}>Add to Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAdd;
