import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MenuCard({ menus, restaurantID, restaurant_name }) {
  const payment = useNavigate();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5050/")
      .then((res) => {
        if (!res.data.status) {
          navigate("/login");
        } else {
          setDataUser(res.data.value);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const details = {
    menu_name: menus.menu_name,
    price: menus.menu_price,
    id_restaurant: restaurantID,
    restaurant_name: restaurant_name,
  };
  function handleOpen() {
    payment("/payment", { state: details });
  }

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          cursor: "pointer",
          border: "20px solid black",
          margin: "10px",
          padding: "10px",
        }}
      >
        <img
          src={menus.image_url}
          alt={menus.menu_name}
          style={{ width: "100px", height: "100px" }}
        />
        <div>{menus.menu_name}</div>
        <div>{menus.menu_price}</div>
      </div>
    </div>
  );
}

export default MenuCard;
