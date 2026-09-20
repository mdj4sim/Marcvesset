import React, { useState, useEffect } from "react";
import TicketCard from "../components/TicketCard";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ticket = ({ setCartItem, cartItem, isAdmin }) => {
  // have to fetch

  const navigate = useNavigate();
  const [ticketItems, setTicketItems] = useState([]);
  const [token, setToken] = useState("");

  const handleAdd = async (ele) => {
    const goodId = ele._id;

    try {
      console.log(token, goodId);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        token: token,
        goods_id: goodId,
      };

      const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/addToCart`;
      const response = await axios.post(url, data, config);

      console.log(response.data);
      alert("Ticket Added Successfully");

      // Handle response as needed
    } catch (err) {
      console.error("Unable to add to cart:", err.message);
    }
  };

  useEffect(() => {
    const fetchTicketItems = async () => {
      const userToken = await JSON.parse(localStorage.getItem("userData"))
        ?.token;
      if (!userToken) {
        alert("Login First");
        navigate("/userls");
      } else {
        setToken(userToken);
      }

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/Tickets/showAllTickets`,
          config
        );

        // console.log(response);
        // console.log(response.data.data);
        setTicketItems(response.data.data);
      } catch (err) {
        console.log("Unable to fetch shop");
      }
    };

    fetchTicketItems();
  }, []);

  return (
    <div className="ct-ticket">
      <h3>Ticket</h3>
      <div className="ct-shop--item">
        {ticketItems.map((ele, i) => {
          return (
            <TicketCard
              key={i}
              handleAdd={handleAdd}
              idx={i}
              ele={ele}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Ticket;
