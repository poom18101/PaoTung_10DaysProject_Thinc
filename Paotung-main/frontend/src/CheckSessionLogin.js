import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CheckSessionLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5050/")
      .then((res) => {
        if (res.data.status) {
          navigate("/");
        } else {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
}
