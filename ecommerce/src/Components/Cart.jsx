import React from "react";
import "./Cart.css";
import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();
  
  console.log('Cart component - items:', items);
  console.log('Cart component - total:', total);

  return (
    <div>
      <section id="page-header" className="about-header">
        <h2>#Cart Items ({items.length})</h2>
        <p>LEAVE A MESSAGE, We love hear from you</p>
      </section>

      <section id="cart" className="section-p1">
        {items.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
              Add some products from the <a href="/#/shop" style={{ color: '#007bff' }}>Shop</a> or <a href="/#/" style={{ color: '#007bff' }}>Home</a> page.
            </p>
          </div>
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
                      <img 
                        src={item.image || '/img/placeholder.png'} 
                        alt={item.name} 
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                        onError={(e) => {
                          e.target.src = '/img/placeholder.png';
                        }}
                      />
                    </td>
                    <td style={{ fontWeight: '500' }}>{item.name}</td>
                    <td style={{ color: '#28a745', fontWeight: '600' }}>Rs. {item.price?.toLocaleString() || 0}</td>
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
                    <td style={{ color: '#dc3545', fontWeight: '600' }}>
                      Rs. {((item.price || 0) * (item.qty || 1)).toLocaleString()}
                    </td>
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
                  <td style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#007bff' }}>
                    Rs. {total?.toLocaleString() || 0}
                  </td>
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
