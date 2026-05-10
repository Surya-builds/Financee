import React from "react";
import { Link } from "react-router-dom";
import "../styles/Notfound.css";

const Notfound = () => {
  return (
    <>
      <div className="container">
        <h1>
          404 Error, Page Not Found <br></br>
          <Link to="/" className="link">
            Go Home
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Notfound;
