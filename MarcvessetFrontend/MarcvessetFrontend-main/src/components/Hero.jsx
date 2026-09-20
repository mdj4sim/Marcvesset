import React from "react";
import self from "../photos/self_1.png";

const Hero = () => {
  return (
    <div className="ct-aPersonal">
      <div className="ct-aPersonal--details">
        <p className="ct-aPersonal--name">
          <span>M</span>ark <span>V</span>assett
        </p>
        <div className="ct-aPersonal--more">
          <p>Melbourne, Australia</p>
          <p>│Punter</p>
          <p>│225lbs</p>
          <p>│6’4</p>
          <p>│Senior</p>
        </div>
      </div>

      <div className="ct-aPersonal--selfImg">
        <img src={self} />
      </div>
    </div>
  );
};

export default Hero;
