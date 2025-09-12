import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartDebug = () => {
  const { items, addToCart, total } = useCart();

  const testProduct = {
    id: 'test-product-1',
    name: 'Test Product',
    price: 299,
    image: '/img/product/f1.jpg'
  };

  const handleTestAdd = () => {
    addToCart(testProduct);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '15px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4>Cart Debug Panel</h4>
      <p><strong>Items in cart:</strong> {items.length}</p>
      <p><strong>Total:</strong> Rs. {total}</p>
      
      <button 
        onClick={handleTestAdd}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        Add Test Product
      </button>
      
      <details>
        <summary>Cart Items</summary>
        <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
          {JSON.stringify(items, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default CartDebug;
