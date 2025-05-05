import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/Api";
import { useAuth } from "../Hooks/useAuth.jsx";

function Profile() {
  const [users, setusers] = useState({});
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    api
      .get("api/auth/profile", {
        headers: { authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);

        if (!res.data.success) {
          navigate("/login");
          console.log(res.data.error);
        } else {
          setusers(res.data.user);
          setisloading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const Userlogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="form">
      <div
        className="card"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {isloading ? (
          "loading......."
        ) : (
          <>
            <div className="card-heading">
              <h2>My Account</h2>
              <div className="line"></div>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <li>First Name :</li>
                <li>Last Name :</li>
                <li>Email</li>
                <li>Created Date : </li>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <li>{users.firstName}</li>
                <li>{users.lastName}</li>
                <li>{users.email}</li>
                <li>{(users.createdAt).split("T")[0]}</li>
              </div>
            </div>
            <Link
              onClick={Userlogout}
              className="card-btn"
              style={{ maxWidth: "100px" }}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
