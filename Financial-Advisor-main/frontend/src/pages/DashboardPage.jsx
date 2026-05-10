import React, { useContext, useEffect } from "react";
import FinancialDataVisualization from "../components/FinancialDataVisualization";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import NewsArticles from "../components/NewsComponent";
import IncomeDataVisualization from "../components/IncomeDataVisualization";
import ExpenseDataVisualization from "../components/ExpenseDataVisualization";
import "../styles/Dashboard.css";

const DashboardPage = () => {
  const { isLoggedIn, userData, refreshUserData } = useContext(LoginContext);
  const navigate = useNavigate();
  let ledger;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      refreshUserData();
    }
  }, [isLoggedIn, navigate,refreshUserData]);

  if (userData) {
    ledger = userData.ledger;
  }
  const expenses = ledger
    ? ledger.filter((item) => item.type === "Debit")
    : null;

  return (
    <div className="dashboard-container">
      <FinancialDataVisualization ledger={ledger} />
      <IncomeDataVisualization ledger={ledger} />
      <ExpenseDataVisualization expenses={expenses} />
      <NewsArticles />
    </div>
  );
};

export default DashboardPage;
