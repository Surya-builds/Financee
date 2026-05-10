import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const totalIncome = 5000; // Placeholder value
  const totalExpenses = 2000; // Placeholder value
  const totalSavings = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      <h2>Financial Overview</h2>
      <div className="dashboard-overview">
        <div className="dashboard-card income">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="dashboard-card expenses">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="dashboard-card savings">
          <h3>Total Savings</h3>
          <p>${totalSavings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
