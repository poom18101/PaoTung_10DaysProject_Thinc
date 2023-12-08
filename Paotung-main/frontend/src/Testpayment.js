import axios from "axios";
import { useEffect, useState } from "react";
import CheckSessionUser from "./CheckSessionUser";
import { useNavigate, useParams } from "react-router-dom";
import MenuCard from "./Component/MenuCard";
import BasicModal from "./Component/Basicmodal";
function Testpayment() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk0NTY4ODgsImlhdCI6MTY5ODU5Mjg4OCwiaXNzIjoicGFvdG9vb25nIiwic3ViIjoiNjFjMDJlMTUtMzFhMy00ZDQzLTk0YWUtMTA2NzE4OTdmN2NjIn0.td6q6Dp_VF5BAjrqbXMhRfEa2Giw3vNPhWGPEY3jhx0'
    const res_tok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk0NTkxNDEsImlhdCI6MTY5ODU5NTE0MSwiaXNzIjoicGFvdG9vb25nIiwic3ViIjoiYjdlN2E5MzMtMDcyZi00MDJlLTk3ZGItNTAxZDQ0ODdiODY5In0.jO6c-QrzK8-YWyHC35cWtyyBd2D-iVbgcUam9ynnZYg'
    const handleclick = ()=>{
        axios.post('https://paotooong.thinc.in.th/v1/wallet/pay/{61c02e15-31a3-4d43-94ae-10671897f7cc}',{
            "amount": 100
            },{
        headers: {
          Authorization: `Bearer ${res_tok}`, // Use the token directly from the constant.
        },
      }).then(res=>console.log(res)).catch(err=>console.log(err));
    }
    const handleget = ()=>{
        axios.get('https://paotooong.thinc.in.th/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${res_tok}`, // Use the token directly from the constant.
        },
      }).then(res=>console.log(res)).catch(err=>console.log(err));
    }
    axios.defaults.withCredentials = true;
    return(<>  
    <button onClick={handleclick}>send</button>
    <button onClick={handleget}>get</button>
    </>)

}
export default Testpayment;
