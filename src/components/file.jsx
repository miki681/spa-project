import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addItem(meal) {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === meal.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === meal.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...meal, qty: 1 }];
    });
  }

  function removeItem(id) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// export default CartContext;
// . Wrap your app with CartProvider
// jsx
// Copy
// Edit
// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './store/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
// 3. Update Meals.jsx to use addItem
// jsx
// Copy
// Edit
// // Meals.jsx
import React, { useEffect, useState, useContext } from "react";
import CartContext from "../store/CartContext";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    fetch("/meals.json")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {meals.map((meal) => (
        <div
          key={meal.id}
          style={{
            width: "220px",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={meal.image}
            alt={meal.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <strong>${meal.price}</strong>
          <br />
          <button onClick={() => addItem(meal)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
4. Update Header.jsx to show cart and submit
jsx
Copy
Edit
// Header.jsx
import { useContext } from "react";
import CartContext from "../store/CartContext";
import logoImg from "../assets/logo.jpg";

export default function Header() {
  const { cartItems, removeItem, clearCart } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  function handleOrder() {
    alert("✅ Order submitted successfully!");
    clearCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant" />
        <h1>Order Food</h1>
      </div>
      <nav>
        <button>Cart ({totalItems})</button>
        {cartItems.length > 0 && (
          <div style={{ background: "#fff", color: "#000", padding: "1rem", borderRadius: "8px" }}>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.qty}
                  <button onClick={() => removeItem(item.id)}>−</button>
                </li>
              ))}
            </ul>
            <button onClick={handleOrder}>Submit Order</button>
          </div>
        )}
      </nav>
    </header>
  );
}
