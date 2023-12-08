import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckSessionUser from "./CheckSessionUser";
import { useUser } from "./UserContext";
import "./Homepage.css";

function Home() {
  const [dataUser, setDataUser] = useState("");
  const [money, setMoney] = useState(10000);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [hist, setHist] = useState("");
  const [time, setTime] = useState("00:00");
  const [timestamp, setTimestmap] = useState("00:00");
  useEffect(() => {
    console.log('here is time stanmp' + timestamp)

    axios
      .get("http://localhost:5050/")
      .then((res) => {
        if (!res.data.status) {
          navigate("/login");
        } else {
          const date = new Date(res.data.value.menu_hist[res.data.value.menu_hist.length-1].time);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Etc/GMT-7",
          });
          console.log(res.data)
          setTimestmap(formattedTime);
          console.log(formattedTime)
          setName(res.data.value.firstName)
          setDataUser(res.data.value);
          setToken(res.data.value.token);
          setHist(res.data.value.menu_hist);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlelogout = ()=>{
    axios
    .get("http://localhost:5050/logout")
    .then((res) => {
      navigate('/login')
    })
    .catch((err) => console.log(err));
  }
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
  console.log(dataUser.menu_hist);
  console.log(hist[1]);

  useEffect(() => {
    console.log('here is time stanmp' + timestamp)
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Etc/GMT+7",
    });
    
    setTime(formattedTime);
  }, []);

  const navigate = useNavigate();
  function handleClickRestaurant() {
    navigate("/restaurants");
  }
  const { user } = useUser();
  axios.defaults.withCredentials = true;

  function handleClickGacha() {
    navigate("/gacha");
  }

  return (
    <div>
      <body>
        <div id = "HomepageHeader">      <button style={{width:'100px' , height:'100px'}} onClick={handlelogout}>LOGOUT</button>
</div>
        <p id="HomepageHeader">สวัสดีครับคุณ<br></br>{name}</p>

        <div id="circle1">
          <img
            id="Bulb1"
            src={require("./image/bulb.png")}
            style={{ opacity: 0.5 }}
          />
          <p id="BulbText"> จำนวน Bulb ที่ใช้ได้</p>
          <p id="BulbAmount"> {money} </p>
        </div>

        <div>
          <p className="Text">มารับตอน ...</p>
          <div id="Box1">
            <p id="Time" >{timestamp}</p>
            <div id="DetailRestAndDish">
              {hist.length?<>   <p>@โรงอาหาร...{hist[hist.length-1].restaurant_name}</p>
              <p>อาหารที่ซื้อ: {hist[hist.length-1].menu_name}</p></>:<></>}

            </div>
          </div>
        </div>

        <div>
          <p className="Text">ประวัติการซื้อ</p>
          <div id="Box2" style={{display:'flex' , wordWrap:'break-word',fontSize:'15px'}}>
            {hist.length>4?<>    <div className="FoodHistory">{'menu:'+hist[hist.length-2].menu_name +'\n'+'restaurant:'+ hist[hist.length-2].restaurant_name}</div>
            <div className="FoodHistory">{'menu:'+hist[hist.length-3].menu_name +'\n'+'restaurant:'+ hist[hist.length-3].restaurant_name}</div>
            <div className="FoodHistory">{'menu:'+hist[hist.length-4].menu_name +'\n'+'restaurant:'+ hist[hist.length-4].restaurant_name}</div></>:<></>}
        
          </div>
        </div>
      </body>

      <footer>
        <div id="ClickBelow">
          <div onClick={handleClickRestaurant} style={{ cursor: "pointer" }}>
            <p className="PortalName"> โรงอาหาร </p>
            <img
              className="Portal"
              src={require("./image/RestaurantSymbol.png")}
            />
          </div>
          <div onClick={handleClickGacha} style={{ cursor: "pointer" }}>
            <p className="PortalName"> สุ่มกาชา </p>
            <img className="Portal" src={require("./image/LilPig.png")} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
