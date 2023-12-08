import "./App.css";
import Home from "./Home";
// import OutlinedCard from "./Component/CardComponent.js";
import Login from "./Login";
import Restaurants from "./Restaurants";
import SignUp from "./SignUp";
import Testpayment from "./Testpayment";
import RestaurantDetail from "./RestaurantDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Payment from "./Payment";
import Gacha from "./Gacha";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/Testpayment" element={<Testpayment />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gacha" element={<Gacha />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
