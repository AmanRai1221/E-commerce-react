import React, { useEffect, useRef } from "react";
import "./Shop.css";
import { useCart } from "../contexts/CartContext.jsx";

export default function Shop() {
  const { addToCart } = useCart();
  const rootRef = useRef(null);

  // Delegate clicks on cart icons within this component
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
      // Normalize relative paths in Shop (it uses img/...) to public path
      const image = rawSrc.startsWith("img") ? `/` + rawSrc : rawSrc;
      const name = titleEl?.textContent?.trim() || "Product";
      const priceText = priceEl?.textContent || "0";
      const priceNum = Number(priceText.replace(/[^0-9]/g, "")) || 0;
      const id = `${name}-${image}`;
      addToCart({ id, name, price: priceNum, image });
      alert("Item added to cart");
    };
    const el = rootRef.current;
    el?.addEventListener("click", handler);
    return () => el?.removeEventListener("click", handler);
  }, [addToCart]);

  return (
    <div ref={rootRef}>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <div class="text-center m-5 ">
        <h2 class="fw-bolder fs-1">Featured Products</h2>
      </div>

      <section id="product1" class="px-3">
        <div class="text-center my-5 ">
          <h2 class="fw-bolder">New Arrivals</h2>
          <p>Summer Collection New Modern Design</p>
        </div>

        <div class="pro-container">
          <div class="pro">
            <img src="img/product/f1.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Printed Shirt</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 300</h4>
            </div>
            <a id="cbtn1" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f2.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Cartoon Astronauts Shirt</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn18" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/product/f3.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Cartoon Astronauts Shirt</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn19" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f4.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>White Printed Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn4" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f5.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Printed Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 300</h4>
            </div>
            <a id="cbtn21" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f6.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>T-Shirts & Shirt Combo</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="cbtn22" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f7.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Plazo Pant</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn23" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/f8.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Girls Kurti</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn24" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n1.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Sky-blue Shirt</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn9" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n2.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Men Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn10" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n3.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Plain White Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn11" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n4.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Half printed Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn12" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n5.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Jeans Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="cbtn13" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n6.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Formal half Pant</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="cbtn14" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n7.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Full Shirts</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="cbtn15" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/product/n8.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Black half Shir</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 300</h4>
            </div>
            <a id="cbtn16" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="product1" class="px-3 electronics">
        <div class="text-center pt-5">
          <h2>Electronic Items</h2>
          <p>Newly Collection of New Modern Items</p>
        </div>
        <div class="pro-container">
          <div class="pro">
            <img src="img/elect/alexa-e1.jpg" alt="" />
            <div class="des">
              <span>Amazon</span>
              <h5>Amazon Echo Dot smart Speaker (Alexa)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 5,500</h4>
            </div>
            <a id="ecbtn1" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/camera-e2.jpg" alt="" />
            <div class="des">
              <span>Canon</span>
              <h5>Canon EOS 5D series DSLR Camera</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 64,400</h4>
            </div>
            <a id="ecbtn2" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/iphone-e3.jpg" alt="" />
            <div class="des">
              <span>iPhone</span>
              <h5>iPhone 15 pro max</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1,00,000</h4>
            </div>
            <a id="ecbtn3" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/zeleboba-e4.jpg" alt="" />
            <div class="des">
              <span>Huawe</span>
              <h5>Earbuds</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 13,000</h4>
            </div>
            <a id="ecbtn20" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/headphones-e5.jpg" alt="" />
            <div class="des">
              <span>Sony</span>
              <h5>Sony Headphone</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 800</h4>
            </div>
            <a id="ecbtn5" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/phone-e6.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Telephone</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 700</h4>
            </div>
            <a id="ecbtn6" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/samsung-e7.jpg" alt="" />
            <div class="des">
              <span>Samsung</span>
              <h5>Samsung S10 (Prism Blue, 128GB) (8GB RAM)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 71,000</h4>
            </div>
            <a id="ecbtn7" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/smartwatch-e8.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Smartwatch (Black color)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="ecbtn8" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/earphone-e9.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Earphone (White color)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 100</h4>
            </div>
            <a id="ecbtn9" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/clock-e10.jpg" alt="" />
            <div class="des">
              <span>Sonata</span>
              <h5>Men Watch </h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="ecbtn10" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/e11.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Smeg Electric Kettle & Matching Smeg Toaster</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="ecbtn11" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/laptop-e12.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Dell Refurbished Laptop</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 40,000</h4>
            </div>
            <a id="ecbtn12" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/powerbank-e13.jpg" alt="" />
            <div class="des">
              <span>Ambrane</span>
              <h5>Ambrane Powerbank</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="ecbtn13" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/watch-e14.jpg" alt="" />
            <div class="des">
              <span>Sonata</span>
              <h5>Men Watch (Blue color)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="ecbtn14" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/wristwatch-e15.jpg" alt="" />
            <div class="des">
              <span>Sonata</span>
              <h5>Watch for men</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 800</h4>
            </div>
            <a id="ecbtn15" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/realme-e16.jpg" alt="" />
            <div class="des">
              <span>Realme</span>
              <h5>Realme 11 5G</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 17,000</h4>
            </div>
            <a id="ecbtn16" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="product1" class="px-3 electronics2">
        <div class="pro-container">
          <div class="pro">
            <img src="img/elect/lamp-e17.jpg" alt="" />
            <div class="des">
              <h5>Study Lamp</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="ec2btn1" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/iphone-e18.jpg" alt="" />
            <div class="des">
              <span>iphone</span>
              <h5>iPhone 16 pro max</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1,20,000</h4>
            </div>
            <a id="ec2btn2" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/charger-e19.jpg" alt="" />
            <div class="des">
              <span>Robotek</span>
              <h5>Fast Charger</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 400</h4>
            </div>
            <a id="ec2btn3" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/light-e20.jpg" alt="" />
            <div class="des">
              <span>Philips</span>
              <h5>Light for Decoration (interior light) </h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="ec2btn4" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/press-e21.jpg" alt="" />
            <div class="des">
              <span>Usha</span>
              <h5>Steam Iron</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 500</h4>
            </div>
            <a id="ec2btn5" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/charger-e22.jpg" alt="" />
            <div class="des">
              <span>TECHNO</span>
              <h5>TECHNO fast Charger with cover</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 900</h4>
            </div>
            <a id="ec2btn6" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/charger-e23.jpg" alt="" />
            <div class="des">
              <span>KTM</span>
              <h5>Mobile Charger </h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 800</h4>
            </div>
            <a id="ec2btn7" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/meta-e24.png" alt="" />
            <div class="des">
              <span>META</span>
              <h5>Virtual Reality Headset (360 degree)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1400</h4>
            </div>
            <a id="ec2btn8" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/watch-e25.jpg" alt="" />
            <div class="des">
              <span>Sonata</span>
              <h5>Set of Four Watch</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1200</h4>
            </div>
            <a id="ec2btn9" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/watch-e26.jpg" alt="" />
            <div class="des">
              <span>Sonata</span>
              <h5>Set of Watch (8 Piece)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1600</h4>
            </div>
            <a id="ec2btn10" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/watch-e27.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Wrist watch for mens</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="ec2btn11" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/infinix-e28.jpg" alt="" />
            <div class="des">
              <span>Infinix</span>
              <h5>Infinix Note 40 pro 5g</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 18,900</h4>
            </div>
            <a id="ec2btn12" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/rolex-e29.jpg" alt="" />
            <div class="des">
              <span>Rolex</span>
              <h5>Watch for Men</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 6000</h4>
            </div>
            <a id="ec2btn13" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/hairdryer-e30.jpg" alt="" />
            <div class="des">
              <span>ANGEBOT</span>
              <h5>Hair Dryer</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 2,300</h4>
            </div>
            <a id="ec2btn14" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/bulb-e31.jpg" alt="" />
            <div class="des">
              <span>Philips</span>
              <h5>LED Bulb</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 600</h4>
            </div>
            <a id="ec2btn15" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/realme-e32.jpg" alt="" />
            <div class="des">
              <span>Realme</span>
              <h5>Realme GT 6T 5G</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 27,999</h4>
            </div>
            <a id="ec2btn16" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="product1" class="px-3 electronics3">
        <div class="pro-container">
          <div class="pro">
            <img src="img/elect/bulb-e33.jpg" alt="" />
            <div class="des">
              <span>Surya</span>
              <h5>LED Bulb</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 199</h4>
            </div>
            <a id="ec3btn1" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/bulb-e34.jpg" alt="" />
            <div class="des">
              <span>Surya</span>
              <h5>LED Bulb</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 119</h4>
            </div>
            <a id="ec3btn2" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/charger-e35.jpg" alt="" />
            <div class="des">
              <span>Robotek</span>
              <h5>Mobile Charger</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 699</h4>
            </div>
            <a id="ec3btn3" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro" onclick="window.location.href='sproduct.html';">
            <img src="img/elect/cctv-e36.jpg" alt="" />
            <div class="des">
              <span>TP-Link Tapo</span>
              <h5>TP-Link Tapo C210 1080p HD Wi-Fi Camera</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 2,399</h4>
            </div>
            <a id="ec3btn4" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/oneplus-e37.jpg" alt="" />
            <div class="des">
              <span>OnePlus</span>
              <h5>OnePlus 13 5G</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 59,999</h4>
            </div>
            <a id="ec3btn5" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/oppo-e38.jpg" alt="" />
            <div class="des">
              <span>OPPO</span>
              <h5>Oppo Reno 13 Pro 5G</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 33,799</h4>
            </div>
            <a id="ec3btn6" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/iphone-e39.jpg" alt="" />
            <div class="des">
              <span>iPhone</span>
              <h5>iPhone 16 Pro (Black Color)</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1,00,000</h4>
            </div>
            <a id="ec3btn7" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/toster-e40.jpg" alt="" />
            <div class="des">
              <span>MUCKLILY</span>
              <h5>Atomatic Pop-up Toaster</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1,299</h4>
            </div>
            <a id="ec3btn8" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/guitar-e41.jpg" alt="" />
            <div class="des">
              <span>ARTSTUDIO</span>
              <h5>Guitar</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 11,299</h4>
            </div>
            <a id="ec3btn9" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/trimer-e42.jpg" alt="" />
            <div class="des">
              <span>KEMEI</span>
              <h5>Hair and Beard Trimer</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1900</h4>
            </div>
            <a id="ec3btn10" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/mixer-e43.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Mixer Grinder</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 4999</h4>
            </div>
            <a id="ec3btn11" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/cleaner-e44.jpg" alt="" />
            <div class="des">
              <span>adidas</span>
              <h5>Tefal Portable Vacuum Cleaner</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 8,999</h4>
            </div>
            <a id="ec3btn12" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/guitar-e45.jpg" alt="" />
            <div class="des">
              <span>ARTSTUDIO</span>
              <h5>Guitar</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 11,999</h4>
            </div>
            <a id="ec3btn13" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/toaster-e46.jpg" alt="" />
            <div class="des">
              <span>MUCKLILY</span>
              <h5>Atomatic Pop-up Toaster</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 1,299</h4>
            </div>
            <a id="ec3btn14" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/coffe-e47.jpg" alt="" />
            <div class="des">
              <span>Nespro</span>
              <h5>Single Serve Coffe maker</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 29,899</h4>
            </div>
            <a id="ec3btn15" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>

          <div class="pro">
            <img src="img/elect/jar-e48.jpg" alt="" />
            <div class="des">
              <span>NutriPto</span>
              <h5>Mixer Jar</h5>
              <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <h4>Rs. 399</h4>
            </div>
            <a id="ec3btn16" href="#">
              <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
          </div>
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
