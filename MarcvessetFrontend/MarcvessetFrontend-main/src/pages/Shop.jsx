import React, { useEffect, useState } from "react";
import test from "../photos/test.png";
import Merchandise from "../components/Merchandise";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [shopItems, setShopItems] = useState([]);
  const [token, setToken] = useState("");

  const handleAdd = async (ele) => {
    const goodId = ele._id;

    try {
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
      alert("Item Added Successfully");
      // Handle response as needed
    } catch (err) {
      console.error("Unable to add to cart:", err.message);
    }
  };

  useEffect(() => {
    const fetchShopItems = async () => {
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
          `${import.meta.env.VITE_SERVER_URL}/api/v1/Merchandise/showAllMerchandise`,
          config
        );

        setShopItems(response.data.data);
      } catch (err) {
        console.log("Unable to fetch shop");
      }
    };

    fetchShopItems();
  }, []);

  return (
    <div className="ct-shop">
      <h3>Shop Items</h3>
      <div className="ct-shop--item">
        {shopItems.map((ele, i) => {
          return (
            <Merchandise
              key={i}
              idx={i}
              ele={ele}
              handleAdd={handleAdd}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
