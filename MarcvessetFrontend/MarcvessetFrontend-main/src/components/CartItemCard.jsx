import React, { useState } from "react";

const CartItemCard = ({ item, idx, handleQntyChange }) => {
  let qnty = 1;

  const handleChange = (e) => {
    qnty = e.target.value;
    handleQntyChange(idx, qnty);
  };

  return (
    <div className="ct-cartCard">
      {item?.merchandiseName && (
        <div className="ct-cc--merchandise">
          <p>{item.merchandiseName}</p>
          <p>${item.merchandisePrice}</p>
          {/* <p>
            <select onChange={handleChange}>
              <option value="0">0 (delete)</option>
              <option value="1" selected>
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p> */}
          <p>${item.merchandisePrice * qnty}</p>
        </div>
      )}

      {item?.teamNames && (
        <div className="ct-cc--ticket">
          <p>{item.teamNames}</p>
          <p>{item.Date}</p>
          <p>${item.price}</p>
          {/* <select onChange={handleChange}>
            <option value="0">0 (delete)</option>
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> */}
          <p>${item.price * qnty}</p>
        </div>
      )}
    </div>
  );
};

export default CartItemCard;
