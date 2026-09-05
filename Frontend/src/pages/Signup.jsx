import React, { useState } from "react";
import Input from "../components/ui/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import api from "../service/Api";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import { signupschema } from "../schema/index.jsx";

function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, handleBlur, resetForm, handleSubmit, values, errors } =
    useFormik({
      initialValues,
      validationSchema: signupschema,
      onSubmit: (values) => {
        Handlesformsubmit(values, resetForm);
        console.log(values);
      },
    });

  const Handlesformsubmit = (data, resetForm) => {
    api
      .post("api/auth/signup", data)
      .then((res) => {
        if (!res.data.success) {
          return toast.error(res.data.message);
        }
        if (res.data.success) {
          return navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form">
      <Helmet>
        <title>SignUp | AbhayPixel</title>
      </Helmet>
      <div className="card">
        <div className="card-heading">
          <h2>Signup From</h2>
          <div className="line"></div>
        </div>
        <ToastContainer />
        <form method="post" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter FirstName"
            value={values.firstName}
            onchange={handleChange}
            onblur={handleBlur}
          />
          <p className="error">{errors && errors.firstName}</p>

          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter lastName"
            value={values.lastName}
            onchange={handleChange}
            onblur={handleBlur}
          />

          <p className="error">{errors && errors.lastName}</p>

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

          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter confirm Password"
            value={values.confirmPassword}
            onchange={handleChange}
            onblur={handleBlur}
          />

          <p className="error">{errors && errors.confirmPassword}</p>

          <button type="submit" className="card-btn">
            submit
          </button>
        </form>
        <p className="new-text">
          Already Have an Account ?{" "}
          <Link className="new-text-color" to={"/login"}>
            login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
