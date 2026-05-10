import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Aboutus from "./pages/Aboutus";
import Notfound from "./components/Notfound";
import DashboardPage from "./pages/DashboardPage";
import ExpenseTracker from "./pages/ExpenseTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { LoginContext } from "./contexts/LoginContext";
import IncomeManagement from "./pages/IncomeManagement";
import Budgeting from "./pages/Budgeting";
import Reports from "./pages/Reports";

function App() {
  // Cookies
  const [cookies, setCookie] = useCookies(["user", "password"]);

  // Startup initializations
  const [isLoggedIn, toggleLogin] = useState(cookies.user ? true : false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (user, password) => {
    setCookie("user", user, { path: "/" });
    setCookie("password", password, { path: "/" });
    toggleLogin(true);
  };

  const clearSession = () => {
    setCookie("user", "", { path: "/" });
    setCookie("password", "", { path: "/" });
    toggleLogin(false);
  };

  const refreshUserData = async () => {
    try {
      const response = await fetch("api/users/retrieve", {
        method: "POST",
        body: JSON.stringify({
          username: cookies.user,
          password: cookies.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!response.success) {
        console.log(response.message);
        clearSession(); // Clear the session if username and password did not match
      } else {
        // Fetch all the data we need
        setUserData(response.user);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Fetch user data once on startup
  useEffect(() => {
    if (isLoggedIn) {
      refreshUserData();
    }
  }, []); // Empty dependency ensures it runs only once on startup

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        toggleLogin,
        cookies,
        handleLogin,
        clearSession,
        userData,
        refreshUserData,
      }}
    >
      <CookiesProvider>
        <Router>
          <div className="AppContainer">
            <div className="Navbar">
              <Navbar />
            </div>
            <div className="Main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<DashboardPage />} />
                <Route path="/Tracker" element={<ExpenseTracker />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/income-management"
                  element={<IncomeManagement />}
                />
                <Route path="/budgeting" element={<Budgeting />} />
                <Route path="reports" element={ <Reports />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
            </div>
            <div className="Footer">
              <Footer />
            </div>
          </div>
        </Router>
      </CookiesProvider>
    </LoginContext.Provider>
  );
}

export default App;
