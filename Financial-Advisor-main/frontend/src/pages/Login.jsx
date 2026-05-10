/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { createRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSHA256Hash } from "boring-webcrypto-sha256";
import "../styles/login_signup.css";
import { LoginContext } from "../contexts/LoginContext";

const Login = () => {
  const { isLoggedIn, handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Dashboard");
    }
  });

  const username = createRef();
  const password = createRef();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = await getSHA256Hash(password.current.value);

      const loginObj = {
        username: username.current.value,
        password: hashedPassword,
      };

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
      });

      const text = await response.text();
      const loginReq = text ? JSON.parse(text) : {};

      if (loginReq.success) {
        handleLogin(username.current.value, hashedPassword);
        navigate("/Dashboard");
      } else {
        alert(loginReq.message || "Incorrect username or password");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-2">
      <div className="login-container">
        <div className="Image">
          <div className="carousel">
            <img src="/images/img1.jpg" alt="Image 1" />
            <img src="/images/img2.jpeg" alt="Image 2" />
            <img src="/images/img3.jpg" alt="Image 3" />
            <img src="/images/img4.jpg" alt="Image 4" />
          </div>
        </div>

        <form id="form" onSubmit={submitHandle}>
          <h2 id="loginh2">Login</h2>

          <div className="form_group_Head">
            <div className="form-group">
              <label>Username</label>
              <input type="text" ref={username} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" ref={password} required />
            </div>

            <button type="submit" className="login-btn button2">
              Login
            </button>

            <span>
              Don't Have an Account?{" "}
              <Link to="/Signup" className="link">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;