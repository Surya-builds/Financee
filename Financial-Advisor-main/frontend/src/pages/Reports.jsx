import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import "../styles/Reports.css";

const Reports = () => {
  const { userData } = useContext(LoginContext);
  const ledger = userData?.ledger || [];
  const [filteredLedger, setFilteredLedger] = useState(ledger);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [stats, setStats] = useState({});
  const [tips, setTips] = useState("");

  // Months list
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter ledger based on the selected month
  useEffect(() => {
    if (selectedMonth === "All") {
      setFilteredLedger(ledger);
    } else {
      setFilteredLedger(
        ledger.filter((entry) => entry.month === selectedMonth)
      );
    }
  }, [selectedMonth, ledger]);
  const formatToINR = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  // Calculate stats and generate tips
  useEffect(() => {
    if (filteredLedger.length > 0) {
      let totalCredits = filteredLedger
        .filter((entry) => entry.type === "Credit")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      let totalDebits = filteredLedger
        .filter((entry) => entry.type === "Debit")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

      let totalSavings = totalCredits - totalDebits;

      totalCredits = formatToINR(totalCredits);
      totalDebits = formatToINR(totalDebits);
      totalSavings = formatToINR(totalSavings);
      setStats({ totalCredits, totalDebits, totalSavings });

      setTips(
        totalSavings > 0
          ? "Great job saving this month! Consider investing your surplus."
          : "Your spending exceeded your earnings. Review your expenses to save more."
      );
    } else {
      setStats({});
      setTips("No transactions found for the selected month.");
    }
  }, [filteredLedger]);

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      {/* Month Selector */}
      <section className="month-selector">
        <label htmlFor="month-select">Select Month:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="month-select"
        >
          <option value="All">All</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </section>

      {/* Bank Statement */}
      <section className="bank-statement">
        <h2>Bank Statement</h2>
        {filteredLedger.length > 0 ? (
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Amount (₹)</th>
                <th>Type</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {filteredLedger.map((entry, index) => (
                <tr
                  key={index}
                  className={
                    entry.type === "Credit" ? "credit-row" : "debit-row"
                  }
                >
                  <td>{entry.name}</td>
                  <td>{entry.description}</td>
                  <td>{formatToINR(entry.amount)}</td>
                  <td>{entry.type}</td>
                  <td>{entry.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found for the selected month.</p>
        )}
      </section>

      {/* Statistics */}
      <section className="stats">
        <h2>Statistics</h2>
        {stats.totalCredits !== undefined ? (
          <ul>
            <li>Total Credits: {stats.totalCredits}</li>
            <li>Total Debits: {stats.totalDebits}</li>
            <li>Total Savings: {stats.totalSavings}</li>
          </ul>
        ) : (
          <p>No transactions found for the selected month.</p>
        )}
      </section>

      {/* Tips */}
      <section className="tips">
        <h2>Tips</h2>
        <p>{tips}</p>
      </section>
    </div>
  );
};

export default Reports;
