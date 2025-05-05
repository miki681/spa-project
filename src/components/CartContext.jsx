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
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
