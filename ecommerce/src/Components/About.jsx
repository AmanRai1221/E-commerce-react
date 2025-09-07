import React from "react";
import "./About.css";

export default function About() {
  return (
    <div>
      <section id="about-head" className="section-p1">
        <img src="img/about/a6.jpg" alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            quam in arcu sollicitudin finibus vel vitae nisi. Donec pulvinar,
            est vel facilisis efficitur, velit justo scelerisque neque, vel
            bibendum nunc nunc eu neque. Nulla facilisi. Sed vel quam in arcu
            sollicitudin finibus vel vitae nisi. Donec pulvinar, est vel
            facilisis efficitur, velit justo scelerisque neque, vel bibendum
            nunc nunc eu neque. Nulla facilisi.
          </p>

          <abbr title="">
            Create stunnig image with as much or as little control as you like
            thanks to a choice of Basic and Creatives modes.
          </abbr>
          <br />

          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
            Create stunnig image with as much or as little control as you like
            thanks to a choice of Basic and Creatives modes.
          </marquee>
        </div>
      </section>

      <section id="about-app" className="section-p1">
        <h1>
          Download Our <a href="#">App</a>
        </h1>
        <div className="video">
          <video src="img/about/1.mp4" autoplay muted loop></video>
        </div>
      </section>

      <section id="feature" class="section-p1">
        <div class="fe-box">
          <img src="img/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
          <img src="img/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>
        <div class="fe-box">
          <img src="img/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div class="fe-box">
          <img src="img/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div class="fe-box">
          <img src="img/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div class="fe-box">
          <img src="img/f6.png" alt="" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <section id="newsletter" class="section-p1 section-m1">
        <div class="newstext">
          <h4>Sign Up For Newsletters</h4>
          <p>
            Get E-mail updates about our lettest shop and{" "}
            <span>special offers</span>
          </p>
        </div>
        <div class="form">
          <input type="text" placeholder="Enter Your Email" />
          <button class="normal">Sign Up</button>
        </div>
      </section>
    </div>
  );
}
