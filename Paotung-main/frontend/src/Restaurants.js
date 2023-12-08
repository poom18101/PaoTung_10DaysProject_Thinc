import axios from "axios";
import { useEffect, useState } from "react";
import CheckSessionUser from "./CheckSessionUser";
import RestaurantCard from "./Component/RestaurantCard";
import { useNavigate } from "react-router-dom";

function Restaurants() {
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
  // Data User
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/restaurants")
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const goToRestaurantDetail = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleClickHome = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>I-Canteen</h1>
        {restaurant.map((restaurant) => (
          <div
            key={restaurant.restaurant_name}
            onClick={() => goToRestaurantDetail(restaurant.restaurant_name)}
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
        <button onClick={handleClickHome}>Home</button>
      </div>
    </>
  );
}

export default Restaurants;
