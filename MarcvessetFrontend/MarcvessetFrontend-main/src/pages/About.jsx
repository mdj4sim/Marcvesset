import React from "react";
import self from "../photos/self_1.png";
import h1 from "../photos/honor/h1.jpg";
import h2 from "../photos/honor/h2.jpeg";
import h3 from "../photos/honor/h3.jpg";
import h4 from "../photos/honor/h4.jpg";
import h5 from "../photos/honor/h5.jpg";

import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="ct-about">
      <Hero />
      <Stats />
      <div className="ct-aHonor">
        <div className="ct-ah--head">
          <p>
            Honors & <span>Awards</span>
          </p>
        </div>
        <div className="ct-ah--list">
          <div>
            <h3>All-Pac-12</h3>
            <div>
              <p>First Team (PFF)</p>
              <p>Second Team (Associated Press)</p>
              <p>Third Team (College Football Network, Phil Steele)</p>
              <p>Honorable Mention (Coaches)</p>
            </div>
          </div>

          <div>
            <img src={h1} alt="" />
          </div>

          <div>
            <img src={h2} alt="" />
          </div>

          <div>
            <h3>All-Transfer Team</h3>
            <div>
              <p>Second Team (College Football Network)</p>
              <p>Mid-season Team (The Athletic)</p>
            </div>
          </div>

          <div>
            <h3>Ray Guy Award</h3>
            <div>
              <p>Great Eight Selection (Week 6)</p>
              <p>Watch List</p>
            </div>
          </div>

          <div>
            <img src={h3} alt="" />
          </div>

          <div>
            <img src={h4} alt="" />
          </div>

          <div>
            <h3>National Football Foundation</h3>
            <div>
              <p>
                Honorable Mention Player of the Week (Week 11, Washington State
                game)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="ct-records">
        <h2>
          <span>Records</span> & Achievements
        </h2>
        <div className="ct-record--sub">
          <img src={h5} />
          <div className="ct-rAchieve">
            <div>
              <p>
                <span>Pac-12 Leader</span>
              </p>
              <p>
                Punts Inside 20: <span>22</span>
              </p>
            </div>

            <div>
              <p>
                <span>CU Records</span>
              </p>
              <p>
                Punts Inside 10:<span> 12</span>
              </p>
              <p>
                Punts Inside 5: <span>6</span>
              </p>
              <p>
                Season Punting Average: <span>44.5</span> (11th in CU history)
              </p>
              <p>
                Career Punting Average: <span>7th</span> in CU history
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Season Stats */}
      <div className="ct-seasonStats">
        <h2>Season Statistics</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Season</th>
                <th>Total Punts</th>
                <th>Average Yards per Punt</th>
                <th>Longest Punt</th>
                <th>Touchbacks</th>
                <th>Fair Catches</th>
                <th>Punts Inside 20</th>
                <th>Punts of 50+ Yards</th>
                <th>Honors</th>
                <th>Watch List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022 (Sophomore)</td>
                <td>52</td>
                <td>44.6 (Louisville record)</td>
                <td>68 yards</td>
                <td>4</td>
                <td>10</td>
                <td>19</td>
                <td>10</td>
                <td>Honorable Mention All-ACC</td>
                <td>Ray Guy Award</td>
              </tr>
              <tr>
                <td>2021 (Freshman)</td>
                <td>48</td>
                <td>41.9 (8th in Louisville history)</td>
                <td>73 yards (6th longest in Louisville history)</td>
                <td>2</td>
                <td>23</td>
                <td>17</td>
                <td>6</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* misc  */}
      <div className="ct-misc">
        <h2>
          miscell<span>aneous</span>
        </h2>
        <div className="ct-misc--div">
          <div>
            <h3>Academic Achievements</h3>
            <p>
              Recognized for academic excellence with distinctions including
              Academic All-District from College Sports Communicators, placement
              on the Pac-12 Academic Honor Roll, and selection to the First Team
              Academic All-Colorado by the Colorado Chapter of the National
              Football Foundation
            </p>
          </div>
          <div>
            <h3>High School Rankings</h3>
            <p>
              In high school rankings, achieved a 3-star prospect star rating
              and was ranked as the No. 7 punter in the class and the No. 4
              player from Australia according to the 247 Composite Rankings
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
