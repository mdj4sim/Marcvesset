import React from "react";
import test from "../photos/match.jpg";

const TicketCard = ({ ele, handleAdd, isAdmin }) => {
  const handleClick = () => {
    handleAdd(ele);
  };
  return (
    <div className="card-merchandise">
      <p className="match-dt">{ele.Date + " " + ele.time}</p>
      <img src={test} alt="merchandise" />
      <div>
        <div className="ct-mCard--details">
          <p>{ele.teamNames}</p>
          <p>${ele.price}</p>
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

export default TicketCard;
