import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="section-p1">
        <div className="col">
            <img className="logo" src="img/Amazon logo.png" width="200px"/>
            <h4>Contact</h4>
            <p><strong>Address: </strong>Seattle, Washington, United States</p>
            <p><strong>Phone: </strong>+1 956 1235 378</p>
            <p><strong>Hours: </strong> 10:00 - 18:00 Mon - Sat</p>
            <div className="follow">
                <h4>Follow us</h4>
                <div className="icon">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-linux"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
            </div>

            
        </div>
        <div className="col">
            <h4>About</h4>
            <a href="#">About Us</a>
            <a href="#">Delivery Information</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Condition</a>
            <a href="#">Contact Us</a>
        </div>

        <div className="col">
            <h4>My Account</h4>
            <a href="#">Sign Up</a>
            <a href="#">View Cart</a>
            <a href="#">My Whishlist</a>
            <a href="#">Track My Order</a>
            <a href="#">Help</a>
        </div>

        <div className="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="row">
                <img src="img/pay/app.jpg"/>
                <img src="img/pay/play.jpg"/>
        </div>
            <p>Secured Payment Gateways</p>
            <img src="img/pay/pay.png"/>
        </div>

        <div className="copyright">
            <p>&copy; 2022, Tech etc - HTML CSS Ecommerce Template</p>
        </div> 
        
    </footer>
    </div>
  )
}
