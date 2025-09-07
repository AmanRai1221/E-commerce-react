import React from "react";
import "./Cart.css";
import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();

  return (
    <div>
      <section id="page-header" className="about-header">
        <h2>#Cart Items</h2>
        <p>LEAVE A MESSAGE, We love hear from you</p>
      </section>

      <section id="cart" className="section-p1">
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table width="100%">
              <thead>
                <tr>
                  <td>Remove</td>
                  <td>Image</td>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button
                        id="rbtn"
                        onClick={() => removeFromCart(item.id)}
                        className="btn-link"
                        aria-label={`Remove ${item.name}`}
                      >
                        <i className="fa-regular fa-circle-xmark"></i>
                      </button>
                    </td>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>Rs. {item.price}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>Rs. {item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "right", fontWeight: 600 }}
                  >
                    Total:
                  </td>
                  <td>Rs. {total}</td>
                </tr>
              </tfoot>
            </table>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <button
                className="normal"
                style={{ backgroundColor: "#22c55e", color: "white" }}
                onClick={() => {
                  if (confirm("Proceed to buy these items?")) {
                    alert("Order placed successfully!");
                    clearCart();
                  }
                }}
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
