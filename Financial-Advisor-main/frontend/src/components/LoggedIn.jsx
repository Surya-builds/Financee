import React from "react";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
const LoggedIn = () => {
  const { clearSession, cookies } = useContext(LoginContext);
  const conformation = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are You Sure?")) {
      clearSession();
    } else {
      return;
    }
  };

  return (
    <div className="LoggedIn">
      <div className="Name">
        Hello{" "}
        <span style={{ textTransform: "capitalize" }}>{cookies.user}</span>!
      </div>
      <button id="logout" className="auth-link" onClick={conformation}>
        Log Out
      </button>
    </div>
  );
};

export default LoggedIn;
