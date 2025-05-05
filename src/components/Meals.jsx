import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const { addItem } = useContext(CartContext);
  useEffect(() => {
    fetch("./meals.json")
      .then((res) => res.json())
      .then((data) => setMeals(data))
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  return (
    <div className="meal-div">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-item">
          <img src={meal.image} alt={meal.name} />
          <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <strong>${meal.price}</strong>
          <br />
          <button className="text-button" onClick={() => addItem(meal)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
