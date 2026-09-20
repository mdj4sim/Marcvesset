import React from "react";
import test from "../photos/shop.png";

const Merchandise = ({ ele, handleAdd, isAdmin }) => {
  const handleClick = () => {
    handleAdd(ele);
  };

  return (
    <div className="card-merchandise">
      <img src={test} alt="merchandise" />
      <div>
        <div className="ct-mCard--details">
          <p>{ele.merchandiseName}</p>
          <p>${ele.merchandisePrice}</p>
        </div>
        <button
          onClick={handleClick}
          className={isAdmin ? "isAdmin-hidden" : ""}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Merchandise;
