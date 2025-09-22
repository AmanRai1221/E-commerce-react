import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div>
      <section id="page-header" className="contact-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love hear from you</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="fa-solid fa-map-marker"></i>
              <p>Seattle, Washington, United States</p>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <p>+1 956 1235 378</p>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <p>contact@example.com</p>
            </li>
          </div>
        </div>
      </section>

      <section id="form-details">
        <form id="contact-form" action="send_email.php" method="POST">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Your Message"
            required
          ></textarea>
          <button id="submitbtn" className="normal" type="submit">
            Submit
          </button>
        </form>
        <div id="form-message" style={{ display: "none", marginTop: 20 }}></div>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletters</h4>
          <p>
            Get E-mail updates about our lettest shop and{" "}
            <span>special offers</span>
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="Enter Your Email" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
    </div>
  );
}
