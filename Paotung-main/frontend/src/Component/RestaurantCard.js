import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  // const history = useNavigate();

  // const handleClick = () => {
  //   history(`/restaurants/${restaurant.restaurant_name}`);
  // };

  return (
    <div
      style={{
        cursor: "pointer",
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
      }}
    >
      <img
        src={restaurant.image_url}
        alt={restaurant.restaurant_name}
        style={{ width: "100px", height: "100px" }}
      />
      <div>{restaurant.restaurant_name}</div>
    </div>
  );
}

export default RestaurantCard;
