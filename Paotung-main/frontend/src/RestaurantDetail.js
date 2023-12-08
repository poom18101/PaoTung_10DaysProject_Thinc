import axios from "axios";
import { useEffect, useState } from "react";
import CheckSessionUser from "./CheckSessionUser";
import { useNavigate, useParams } from "react-router-dom";
import MenuCard from "./Component/MenuCard";
import BasicModal from "./Component/Basicmodal";
function RestaurantDetail() {
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
  const restaurant = useNavigate();
  function handleClickRestaurant() {
    restaurant("/restaurants");
  }
  let { id } = useParams();

  const userData = CheckSessionUser();
  axios.defaults.withCredentials = true;
  const [menu, setMenu] = useState([]);
  const [restaurantID, setRestaurantID] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:5050/menus", {
        restaurant_name: id,
      })
      .then((res) => {
        setMenu(res.data.menu); // Set the restaurant data using the setter
        setRestaurantID(res.data.id);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  console.log(menu);
  console.log(restaurantID);
  //   console.log(menu.menu);
  //   const menulist = menu.menu;
  //   console.log(menulist);

  return (
    <>
      <h1>{id}</h1>
      {menu.map((item) => (
        <div key={item.menu_name}>
          <MenuCard
            menus={item}
            restaurantID={restaurantID}
            restaurant_name={id}
          />
        </div>
      ))}
      <button onClick={handleClickRestaurant}>โรงอาหาร</button>
    </>
  );
}
export default RestaurantDetail;