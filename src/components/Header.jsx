import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "./CartContext";

export default function Header() {
  const { cartItems, removeItem, clearCart } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  function handleOrder() {
    alert("✅ Order submitted successfully!");
    clearCart();
  }

  return (
    <header
     id="main-header"
     >
      <div id="title">
        <img src={logoImg} alt="restaurant" />
        <h1>Order Food</h1>
      </div>

      <nav >
        <button className="button-one" > Card ({totalItems})</button>
        {cartItems.length > 0 && (
          <div className="cart-dropdown" >
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} * {item.qty}
                  <button className="button-one" onClick={() => removeItem(item.id)}>-</button>
                </li>
              ))}
            </ul>
            <button className="button-one" onClick={handleOrder}>Submit Order</button>
          </div>
        )}
      </nav>
    </header>
  );
}
