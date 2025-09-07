import React from "react";
import './Blog.css';

export default function Blog() {
  return (
    <div>
      <section id="page-header" className="blog-header">
        <h2>#readmore</h2>
        <p>Read all case study about our products!</p>
      </section>

      <section id="blog">
        <div className="blog-box">
          <div className="blog-img">
            <img src="img/blog/b1.jpg" />
          </div>
          <div className="blog-details">
            <h4>The Cotton-Jersey Zip-Up Hoodie</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waiscoat
              selfies wolf chartreuse hexagon irony, godard..
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src="img/blog/b2.jpg" />
          </div>
          <div className="blog-details">
            <h4>How to Style a Quiff</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waiscoat
              selfies wolf chartreuse hexagon irony, godard..
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src="img/blog/b3.jpg" />
          </div>
          <div className="blog-details">
            <h4>Must-Have Skater Girl Items</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waiscoat
              selfies wolf chartreuse hexagon irony, godard..
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src="img/blog/b4.jpg" />
          </div>
          <div className="blog-details">
            <h4>Runway-Inspired Trenda</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waiscoat
              selfies wolf chartreuse hexagon irony, godard..
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
        <div className="blog-box">
          <div className="blog-img">
            <img src="img/blog/b6.jpg" />
          </div>
          <div className="blog-details">
            <h4>AW20 Menswear Trends</h4>
            <p>
              Kickstarter man braid godard coloring book. Raclette waiscoat
              selfies wolf chartreuse hexagon irony, godard..
            </p>
            <a href="#">CONTINUE READING</a>
          </div>
        </div>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
            <h4>Sign Up For Newsletters</h4>
            <p>Get E-mail updates about our lettest shop and <span>special offers</span></p>
        </div>
        <div className="form">
            <input type="text" placeholder="Enter Your Email"/>
            <button class="normal">Sign Up</button>
        </div>
      </section>

    </div>
  );
}
