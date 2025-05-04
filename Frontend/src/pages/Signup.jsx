import React, { useState } from "react";
import Input from "../components/ui/Input";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import api from '../service/Api'

function Signup() {
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const Handlesubmit = (e) => {
    e.preventDefault();

    api.post('api/auth/signup',formdata)
    .then((res) => {
      if(!res.data.success){
        return toast.error(res.data.message);
      }
      if(res.data.success){
        return toast.success(res.data.message);
      }
      
  })
    .catch((error) => console.log(error))

  };

  const Handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card">
      <div className="card-heading">
        <h2>Signup From</h2>
        <div className="line"></div>
      </div>
      <ToastContainer />
      <form method="post" onSubmit={Handlesubmit}>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter FirstName"
          value={formdata.firstName}
          onchange={Handlechange}
        />

        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter lastName"
          value={formdata.lastName}
          onchange={Handlechange}
        />

        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          value={formdata.email}
          onchange={Handlechange}
        />

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={formdata.password}
          onchange={Handlechange}
        />

        <button className="card-btn">submit</button>
      </form>
    </div>
  );
}

export default Signup;
