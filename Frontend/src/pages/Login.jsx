import React, { useState } from "react";
import Input from "../components/ui/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.jsx";
import api from "../service/Api.js";

function Login() {
  let navigate = useNavigate();
  const { setToken } = useAuth();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const Handlesubmit = (e) => {
    e.preventDefault();

    api
      .post("api/auth/login", formdata)
      .then((res) => {
        console.log(res.data);

        if (!res.data.success) {
          return toast.error(res.data.message);
        }
        if (res.data.success) {
          if (res.data.token) {
            setToken(res.data.token);
            navigate("/");
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const Handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form">
      <div className="card">
        <div className="card-heading">
          <h2>Login From</h2>
          <div className="line"></div>
        </div>
        <ToastContainer />

        <form method="post" onSubmit={Handlesubmit}>
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
        <p className="new-text">Create An New Account ? <Link className="new-text-color" to={"/signup"}>Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;
