import React, { useState, useEffect, createContext } from "react";
import Popup from "./Popup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Gacha() {
  const [dataUser, setDataUser] = useState("");
  const [money, setMoney] = useState(10000);
  const [token, setToken] = useState("");
  const [buttonPopup, setButtonPopup] = useState();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const handleGacha = () => {
    const randomNumber = Math.floor(Math.random() * 19) + 1;
    setResult(randomNumber);
  };

  const pay = () => {
    axios.post(
      `https://paotooong.thinc.in.th/v1/wallet/pay/{b7e7a933-072f-402e-97db-501d4487b869}`,
      {
        amount: 20,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token directly from the constant.
        },
      }
    );
  };
  useEffect(() => {
    axios
      .get("http://localhost:5050/")
      .then((res) => {
        if (!res.data.status) {
          navigate("/login");
        } else {
          setDataUser(res.data.value);
          setToken(res.data.value.token);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(token);
  axios
    .get("https://paotooong.thinc.in.th/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token directly from the constant.
      },
    })
    .then((res) => {
      console.log(res);
      setMoney(res.data.user.money);
    })
    .catch((err) => console.log(err));
  // Data User
  console.log(dataUser);

  const renderResult = () => {
    if (result === 12 || result === 13 || result === 14) {
      return "คุณได้รับ Code : INFINIT";
    } else if (result % 3 === 0) {
      return "คุณได้รับ เกลือ 1 EA";
    } else if (result % 3 === 1) {
      return "คุณได้รับ Code : THINC";
    } else if (result % 3 === 2) {
      return "คุณได้รับ Code : ILOVECU";
    }
  };

  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <div>
      <header className="header"> สุ่มกาชา </header>

      <body className="Body">
        <div id="circle1">
          <img id="Bulb1" src={require("./image/bulb.png")} />
          <p id="BulbText"> จำนวน Bulb ที่ใช้ได้</p>
          <p id="BulbAmount"> {money} </p>
        </div>

        <button
          onClick={() => {
            setButtonPopup(true);
            handleGacha();
            pay();
          }}
          type="submit"
          id="RandomButton"
        >
          สุ่ม
        </button>
        <div id="TextBelowRandom">
          <p id="RandomCost">-20</p>
          <img id="Bulb2" src={require("./image/bulb.png")} />
        </div>
      </body>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <p>ขอแสดงความยินดี !</p>
        <p id="ResultOfGacha">{renderResult()}</p>
        <p>กรุณาจดส่วนลดเพื่อนำไปใช้งาน</p>
      </Popup>
      <button onClick={handleClickHome}>กลับหน้าหลัก</button>
    </div>
  );
}
