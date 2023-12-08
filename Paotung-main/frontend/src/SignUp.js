import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [datasignup, setDatasignup] = useState("");
  const [Token, setToken] = useState("");
  const [id, setId] = useState("");
  const [dat, setDat] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    console.log("use", Token);
  }, [Token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/v1/auth/register", {
        email: email,
        password: password,
        firstName: firstname,
        familyName: lastname,
      })
      .then((response) => {
        // Assuming the token is correct and the property's path is right.
        const token = response.data.token.accessToken;
        setToken(token);

        console.log(response.data); // Log the whole response data for debugging.
        // Now, we're returning the inner axios call, which is a promise, to be handled by the next .then()
        return [
          axios.get("https://paotooong.thinc.in.th/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token directly from the constant.
            },
          }),
          token,
        ];
      })
      .then((response) => {
        console.log(
          response[0].then((res) => {
            axios.post("http://localhost:5050/signup", {
              value: {
                ...res.data.user,
                password: password,
                token: response[1],
              },
            });
          })
        );
        navigate("/login"); // Navigating after the second request is successful.
      })
      .catch((error) => {
        console.error("An error occurred:", error); // Log the error for debugging purposes.
        navigate("/login"); // Navigate or handle error as needed.
      });
  };

  return (
    <div>
      <h2 id="RegisterHeader">SignUp</h2>
      {/* <Link to="/testpayment">
        <button>testpay</button>
      </Link> */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          className="Input"
          type="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="Input"
          type="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="Input"
          type="firstname"
          placeholder="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="Input"
          type="lastname"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button type="submit" id="Register">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
