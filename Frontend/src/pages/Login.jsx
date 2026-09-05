import React, { useState } from "react";
import Input from "../components/ui/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth.jsx";
import api from "../service/Api.js";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import { loginschema } from "../schema/index.jsx";
function Login() {
  let navigate = useNavigate();
  const { setToken } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    values,
    errors,
  } = useFormik({
    initialValues,
    validationSchema: loginschema,
    onSubmit: function (values) {
      HandleLoginsubmit(values);
    },
  });
  const HandleLoginsubmit = (formdata) => {
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

  return (
    <div className="form">
      <Helmet>
        <title>Login | AbhayPixel</title>
      </Helmet>
      <div className="card">
        <div className="card-heading">
          <h2>Login From</h2>
          <div className="line"></div>
        </div>
        <ToastContainer />

        <form method="post" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={values.email}
            onchange={handleChange}
            onblur={handleBlur}
          />

          <p className="error">{errors && errors.email}</p>

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={values.password}
            onchange={handleChange}
            onblur={handleBlur}
          />

          <p className="error">{errors && errors.password}</p>

          <button type="submit" className="card-btn">
            submit
          </button>
        </form>
        <p className="new-text">
          Create An New Account ?{" "}
          <Link className="new-text-color" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
