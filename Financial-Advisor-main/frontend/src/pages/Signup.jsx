/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { createRef, useContext, useEffect } from "react";
import { getSHA256Hash } from "boring-webcrypto-sha256";
import "../styles/login_signup.css";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { isLoggedIn, handleLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Dashboard");
    }
  }, [isLoggedIn, navigate]);

  const username = createRef();
  const email = createRef();
  const password = createRef();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const hashed = await getSHA256Hash(password.current.value);

      const postObj = {
        username: username.current.value,
        email: email.current.value,
        password: hashed,
      };

      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
      });

      const text = await response.text();
      const signUpReq = text ? JSON.parse(text) : {};

      if (signUpReq.success) {
        handleLogin(username.current.value, hashed);
        navigate("/Dashboard");
      } else {
        alert(signUpReq.message || "Signup failed");
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
          <h2 id="signup2">Sign Up</h2>

          <div className="form_group_Head">
            <div className="form-group">
              <label>Username</label>
              <input type="text" ref={username} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" ref={email} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" ref={password} required />
            </div>

            <button type="submit" className="signup-btn button2">
              Sign Up
            </button>

            <span>
              Already Have an Account?{" "}
              <Link to="/login" className="link">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;