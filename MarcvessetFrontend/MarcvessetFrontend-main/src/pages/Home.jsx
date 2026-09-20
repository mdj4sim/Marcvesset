import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import h5 from "../photos/honor/h5.jpg";
import vid from "../photos/vid.mp4";
import selfImg from "../photos/aside_self.jpg";

import s1 from "../photos/gallery/1.jpg";
import s2 from "../photos/gallery/2.jpg";
import s3 from "../photos/gallery/3.jpeg";
import s4 from "../photos/gallery/4.jpg";
import s5 from "../photos/gallery/5.jpg";
import s6 from "../photos/gallery/6.jpg";
import s7 from "../photos/gallery/7.jpg";
import s8 from "../photos/gallery/8.jpg";
import s9 from "../photos/gallery/9.jpeg";

const Home = () => {
  // const navigate = useNavigate();

  return (
    <div className="ct-home">
      <Hero />
      <div className="ct-h--bio">
        <h3>Star Punter's Season Highlights</h3>
        <div>
          <p>
            Celebrate the backbone of our team’s success this season with our
            standout punter! Consistency and precision define their performance,
            evident in key victories where their average of 40.2 yards over five
            punts against NC State set the tone for crucial field position.
            Against Clemson, they reached new heights with an impressive
            47.5-yard average over six punts, showcasing both distance and
            accuracy with minimal touchbacks.
          </p>
          <p>
            Their impact continued against JMU, averaging 45.0 yards over three
            punts, proving instrumental in yet another decisive win. Facing
            tough opponents like Wake Forest and Pitt, they maintained their
            high standard, averaging 40.3 yards and 42.8 yards respectively
            across seven punts, ensuring our team consistently controlled the
            field.
          </p>
          <p>
            From flipping field position to executing under pressure, our
            punter's contributions have been invaluable this season, playing a
            pivotal role in our victories.
          </p>
        </div>
      </div>

      <div className="background-video">
        <img src={selfImg} alt="" />
        <video controls>
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag. I suggest you upgrade
          your browser.
        </video>
      </div>

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

      <div className="ct-imgGallery ct-records">
        <h2>Gallery</h2>
        <div className="ct-gallery">
          <img src={s1} alt="" />
          <img src={s2} alt="" />
          <img src={s3} alt="" />
          <img src={s4} alt="" />
          <img src={s5} alt="" />
          <img src={s6} alt="" />
          <img src={s7} alt="" />
          <img src={s8} alt="" />
          <img src={s9} alt="" />
        </div>
      </div>

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

export default Home;
