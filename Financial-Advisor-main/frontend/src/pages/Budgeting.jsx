import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import "../styles/Budgeting.css";

const Budgeting = () => {
  const { isLoggedIn, cookies, refreshUserData, userData } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const [goal, setGoal] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const [goals, setGoals] = useState([]);
  const [savings, setSavings] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [showLowSavingsAlert, setShowLowSavingsAlert] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (userData) {
      // Calculate total income (credits)
      const income = userData.ledger
        .filter((item) => item.type === "Credit")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      // Calculate total expenses (debits)
      const expenses = userData.ledger
        .filter((item) => item.type === "Debit")
        .reduce((sum, item) => sum + Number(item.amount), 0);

      const currentSavings = income - expenses;

      setTotalIncome(income);
      setTotalExpenses(expenses);
      setSavings(currentSavings);
      setGoals(userData.goals || []);

      // Show alert if savings are less than 10% of income
      setShowLowSavingsAlert(currentSavings < income * 0.1);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(goal.amount) <= 0) {
      alert("Goal amount must be greater than 0");
      return;
    }

    const response = await fetch("api/users/goals", {
      method: "POST",
      body: JSON.stringify({
        username: cookies.user,
        password: cookies.password,
        goal: goal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (!response.success) {
      alert(
        "There was an issue while setting the goal. Please try again later."
      );
      return;
    }

    refreshUserData();

    setGoal({
      name: "",
      description: "",
      amount: "",
    });
  };

  const calculateProgress = (goalAmount) => {
    return Math.min((savings / goalAmount) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="budgeting_container">
      {showLowSavingsAlert && (
        <div className="alert_budget">
          ⚠️ Warning: Your savings have dropped below 10% of your total income!
        </div>
      )}

      <div className="stats_container">
        <div className="stat_card">
          <h3>Total Income</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </div>
        <div className="stat_card">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="stat_card">
          <h3>Current Savings</h3>
          <p className={savings < 0 ? "negative" : "positive"}>
            {formatCurrency(savings)}
          </p>
        </div>
      </div>

      <div className="form_section">
        <h2>Set New Goal</h2>
        <form onSubmit={handleSubmit} className="global_form">
          <input
            type="text"
            name="name"
            value={goal.name}
            onChange={handleChange}
            placeholder="Goal Name"
            required
            maxLength={50}
            className="text-box global_box"
          />
          <textarea
            name="description"
            value={goal.description}
            onChange={handleChange}
            placeholder="Goal Description"
            required
            maxLength={200}
            className="text-box global_box"
          />
          <input
            type="number"
            name="amount"
            value={goal.amount}
            onChange={handleChange}
            placeholder="Target Amount (₹)"
            required
            min="1"
            className="text-box global_box"
          />
          <button type="submit" className="button1 buttonGoal">
            Set Goal
          </button>
        </form>
      </div>

      <div className="goals_section">
        <h2>Your Goals</h2>
        <div className="goals_grid">
          {goals.map((g, index) => (
            <div key={index} className="goal_card">
              <h3>{g.name}</h3>
              <p>{g.description}</p>
              {/* <div className="goal_card_innerWrap"> */}
                <div className="goal_amount">
                  Target: {formatCurrency(g.amount)}
                </div>
                <div className="progress_container">
                  <div
                    className="progress_bar"
                    style={{ width: `${calculateProgress(g.amount)}%` }}
                  ></div>
                  <span className="progress_text">
                    {calculateProgress(g.amount).toFixed(1)}%
                  </span>
                </div>
                <div className="remaining_amount">
                  {savings >= g.amount ? (
                    <span className="goal_reached">Goal Reached! 🎉</span>
                  ) : (
                    <span>Remaining: {formatCurrency(g.amount - savings)}</span>
                  )}
                </div>
              </div>
            // </div>
          ))}
        </div>
        {goals.length === 0 && (
          <div className="no-goals">
            No goals set yet. Start by setting your first financial goal!
          </div>
        )}
      </div>
    </div>
  );
};

export default Budgeting;
