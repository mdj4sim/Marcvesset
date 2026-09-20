import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Contact = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  console.log("Admin contact ", isAdmin);

  const handleChange = (e) => {
    console.log(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async () => {
    alert("Submitted");
  };

  useEffect(() => {
    if (isAdmin) navigate("/");
  }, []);

  return (
    <div className="ct-contact">
      <h3>Contact Me</h3>
      <div className="ct-contact--main">
        <div className="ct-contact--address">
          <div>
            <p> ⚲ Address</p>
            <p>Abc, Zyx, 67819</p>
          </div>
          <div>
            <p> ☎ Phone</p>
            <p>+11-11111111</p>
          </div>
          <div>
            <p> ✉ Email</p>
            <p>xyz@abc.com</p>
          </div>
        </div>
        <form className="ct-contact--form">
          <h3>Send Message</h3>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <textarea
              type="text"
              name="message"
              placeholder="Type your Message"
              onChange={handleChange}
              required
            />
          </div>
          <button className="ct-cart--btn">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
