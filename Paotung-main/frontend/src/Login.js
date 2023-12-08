// src/components/Login.js
import "./Login.css";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CheckSessionLogin from "./CheckSessionLogin";
import { useUser } from "./UserContext";

export const ApiDataContext = createContext();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  axios.defaults.withCredentials = true;

  CheckSessionLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5050/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        window.alert("wrong username or answer");
        console.log(err);
        navigate("/login");
      });
  };

  return (
    <div className="logincontrol">
      <img id="PaotungLogo" src={require("./image/bulb.png")} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "2px" }}
      >
        <label>ชื่อผู้ใช้</label>
        <input
          className="Input"
          required
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>รหัสผ่าน</label>
        <input
          className="Input"
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" id="LoginButton">
          Login
        </button>
      </form>
      <Link to="/Signup">
        <button id="RegisterButton" style={{ marginBottom: "200px" }}>
          SignUp
        </button>
      </Link>
    </div>
  );
}

export default Login;
