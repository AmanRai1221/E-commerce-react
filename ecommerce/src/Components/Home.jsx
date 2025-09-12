import React, { useEffect, useRef } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const rootRef = useRef(null);

  // Delegate clicks on any cart icon inside this component
  useEffect(() => {
    const handler = (e) => {
      const icon = e.target.closest(".cart");
      if (!icon || !rootRef.current || !rootRef.current.contains(icon)) return;
      e.preventDefault();
      const pro = icon.closest(".pro");
      if (!pro) return;
      const imgEl = pro.querySelector("img");
      const titleEl =
        pro.querySelector(".product-title") || pro.querySelector("h5");
      const priceEl = pro.querySelector(".price") || pro.querySelector("h4");
      const rawSrc = imgEl?.getAttribute("src") || "";
      // Ensure image path is correct
      const image = rawSrc.startsWith("/") ? rawSrc : "/" + rawSrc;
      const name = titleEl?.textContent?.trim() || "Product";
      const priceText = priceEl?.textContent || "0";
      // Better price extraction - remove 'Rs.' and commas
      const priceNum = Number(priceText.replace(/[^0-9]/g, "")) || 0;
      const id = `${name}-${priceNum}-${Date.now()}`; // Make ID more unique
      
      console.log('Home - Extracted product data:', { id, name, price: priceNum, image });
      addToCart({ id, name, price: priceNum, image });
      alert(`"${name}" added to cart for Rs. ${priceNum}`);
    };
    const el = rootRef.current;
    el?.addEventListener("click", handler);
    return () => el?.removeEventListener("click", handler);
  }, [addToCart]);

  return (
    <div ref={rootRef}>
      <section>
        <div id="hero">
          <h4>Trade-in-offer</h4>
          <h2>Supper value deals</h2>
          <h1>On all products</h1>
          <p>Save more coupons & up to 70% off!</p>
          <button id="shopbtn" onClick={() => navigate("/Shop")}>
            Shop Now
          </button>
        </div>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="/img/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="/img/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="fe-box">
          <img src="/img/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="/img/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="/img/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="/img/f6.png" alt="" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>

        <div className="pro-container">
          <div className="pro">
            <img src="/img/product/f1.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5 className="product-title">Printed Men's Shirt</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4 className="price">Rs. 300</h4>
            </div>
            <a id="cbtn1" href="#">
              <i className="fa-solid fa-cart-shopping cart add-cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f2.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5 className="product-title">Cartoon Astronauts T-Shirts</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4 className="price">Rs. 400</h4>
            </div>
            <a id="cbtn2" href="#">
              <i className="fa-solid fa-cart-shopping cart add-cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f3.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5 className="product-title">Cartoon Astronauts T-Shirts</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4 className="price">Rs. 400</h4>
            </div>
            <a id="cbtn3" href="#">
              <i className="fa-solid fa-cart-shopping cart add-cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f4.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>White Printed Men's Shirt</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn4" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f5.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5> Printed Shirt</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 300</h4>
            </div>
            <a id="cbtn5" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f6.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>T-Shirts & Shirt Combo</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="cbtn6" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f7.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>Plazo Pant</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn7" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/product/f8.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>Girls Kurti</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn8" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
        </div>
      </section>

      <div className="text-center my-6">
        <Link to="/Shop" className="btn btn-warning">
          More Items..
        </Link>
      </div>

      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>
          Up to <span>70% off</span> All t-shirts & Accessories
        </h2>
        <button id="more" className="normal" onClick={() => navigate("/Shop")}>
          Explore More
        </button>
      </section>

      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <div className="pro-container">
          <div className="pro">
            <img src="/img/elect/alexa-e1.jpg" alt="" />
            <div className="des">
              <span>Amazon</span>
              <h5>Amazon Echo Dot smart Speaker (Alexa)</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 5,500</h4>
            </div>
            <a id="cbtn9" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/camera-e2.jpg" alt="" />
            <div className="des">
              <span>Canon</span>
              <h5>Canon EOS 5D series DSLR Camera</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 64,399</h4>
            </div>
            <a id="cbtn10" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/iphone-e3.jpg" alt="" />
            <div className="des">
              <span>iPhone</span>
              <h5>iPhone 15 pro max</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 99,999</h4>
            </div>
            <a id="cbtn11" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/zeleboba-e4.jpg" alt="" />
            <div className="des">
              <span>Huawe</span>
              <h5>Earbuds</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 12,999</h4>
            </div>
            <a id="cbtn12" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/headphones-e5.jpg" alt="" />
            <div className="des">
              <span>Sony</span>
              <h5>Sony Headphone</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 799</h4>
            </div>
            <a id="cbtn13" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/phone-e6.jpg" alt="" />
            <div className="des">
              <span>Nokia</span>
              <h5>Telephone</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 699</h4>
            </div>
            <a id="cbtn14" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/samsung-e7.jpg" alt="" />
            <div className="des">
              <span>Samsung</span>
              <h5>Samsung S10 (Prism Blue, 128GB) (8GB RAM)</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 70,999</h4>
            </div>
            <a id="cbtn15" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="/img/elect/smartwatch-e8.jpg" alt="" />
            <div className="des">
              <span>KDM</span>
              <h5>Smartwatch (Black Color)</h5>
              <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn16" href="#">
              <i className="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
        </div>
      </section>

      <div className="text-center my-6">
        <Link to="/Shop" className="btn btn-success">
          More Items..
        </Link>
      </div>

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sale at Amazon</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>upcoming season</h2>
          <span>The best classic dress is on sale at Amazon</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW FOOTWEAR COLLECTION</h2>
          <h3>Spring / Summer</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>SHIRTS</h2>
          <h3>New Trendy Prints</h3>
        </div>
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
