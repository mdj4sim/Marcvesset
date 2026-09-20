import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import axios from "axios";

const Cart = ({ isAdmin }) => {
  const navigate = useNavigate();
  const shippingPrice = 10;
  const taxAmount = 5;

  const [cartItem, setCartItem] = useState([]);

  const [totalMerchandisePrice, setTotalMerchandisePrice] = useState(0);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [token1, setToken] = useState("");

  // calculating price/after qnty change/
  const priceSet = () => {
    var dataM = 0;
    var dataT = 0;

    // console.log(ele);

    cartItem.forEach((ele) => {
      if (ele?.merchandiseName) {
        dataM += Number(ele.merchandisePrice) * Number(ele.qnty);
      } else if (ele?.teamNames) {
        dataT += Number(ele.price) * Number(ele.qnty);
      }
    });

    setTotalMerchandisePrice(dataM);
    setTotalTicketPrice(dataT);
  };

  // handling the quantity change
  const handleQntyChange = async (idx, qnty) => {
    if (Number(qnty) === 0) {
      console.log("Zero Mila");
      const tempArr = [];
      cartItem.forEach((ele, i) => {
        if (i !== idx) tempArr.push(cartItem[i]);
      });
      setCartItem(tempArr);
      return;
    } else {
      console.log(qnty, idx);
      cartItem[idx].qnty = Number(qnty);
      priceSet();
    }
  };

  useEffect(() => {
    if (isAdmin) navigate("/");

    const fetchCartItems = async () => {
      try {
        const userToken = await JSON.parse(localStorage.getItem("userData"))
          ?.token;
        if (!userToken) {
          alert("Login First");
          navigate("/userls");
        } else {
          setToken(userToken);
        }

        console.log(userToken, "in cart");

        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const data = {
          token: userToken,
        };

        console.log(data, "->>>>>> data");

        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/showAllGoods`;

        const response = await axios.post(url, data, config);

        console.log(response.data.allGoods);
        setCartItem(response.data.allGoods);

        console.log("Hey");
      } catch (err) {
        console.log("Unable to fetch shop");
      }
    };
    fetchCartItems();
    priceSet();
  }, [token1]);

  // useEffect(() => {
  //   if (isAdmin) navigate("/");
  // }, []);

  return (
    <div className="ct-cart">
      <div className="ct-cart--head">Shopping Cart</div>
      <div className="ct-cart--block">
        <div>
          {cartItem.length !== 0 &&
            cartItem.map((item, i) => (
              <CartItemCard
                key={i}
                item={item}
                idx={i}
                handleQntyChange={handleQntyChange}
              />
            ))}
        </div>
        <div
          className={
            "ct-cart--final " + (cartItem?.length === 0 ? "hidden" : "")
          }
        >
          <div className="order-summary">
            <h2>Order Summary</h2>
            <table>
              <tbody>
                <tr>
                  <td>Merchandise</td>
                  <td>${totalMerchandisePrice}</td>
                </tr>
                <tr>
                  <td>Tickets</td>
                  <td>${totalTicketPrice}</td>
                </tr>
                <tr>
                  <td>Shipping & Handling</td>
                  <td>${shippingPrice}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>${taxAmount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Order Total</strong>
                  </td>
                  <td>
                    <strong>
                      $
                      {shippingPrice +
                        taxAmount +
                        totalMerchandisePrice +
                        totalTicketPrice}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="ct-cart--btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// Item :

// 1. Merchandise
// type : Merchandise
// Product name
// Product price
// Qnty

// 2. Ticket
// type : ticket
// Match : a vs b
// Date / Time
// price
// qnty
