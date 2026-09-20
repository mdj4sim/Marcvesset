import React from "react";

const Stats = () => {
  return (
    <div className="ct-playerStats">
      <p className="ct-pStats--head">
        2023 Season <span>(Junior)</span> at <span>Colorado</span>{" "}
      </p>
      <div className="ct-pStats--data">
        <li>
          <p>12</p>
          <p>Game Played</p>
        </li>
        <li>
          <p>65</p>
          <p>Total Punts</p>
        </li>
        <li>
          <p>2,845</p>
          <p>Total Yards</p>
        </li>
        <li>
          <p>44.5</p>
          <p>Average Yards per Punt</p>
        </li>
        <li>
          <p>22</p>
          <p>Punts Inside 20</p>
        </li>
        <li>
          <p>3</p>
          <p>Touchbacks</p>
        </li>
        <li>
          <p>16</p>
          <p>Punts of 50+ Yards</p>
        </li>
        <li>
          <p>60 yards</p>
          <p>Longest Punt</p>
        </li>
        <li>
          <p>14</p>
          <p>Fair Catches</p>
        </li>
      </div>
    </div>
  );
};

export default Stats;
