import React from "react";
import { NavLink } from "react-router-dom";

const LoginSignUp = () => {
  return (
    <div className="NotLoggedIn">
      <NavLink to="/login" className="auth-link" id="login">
        Login
      </NavLink>
      <NavLink to="/signup" className="auth-link" id="signup">
        Sign Up
      </NavLink>
    </div>
  );
};

export default LoginSignUp;
