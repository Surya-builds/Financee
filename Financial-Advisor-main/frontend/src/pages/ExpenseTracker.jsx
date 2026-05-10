import React, { useContext, useEffect, useState } from "react";
import "../styles/ExpenseTracker.css";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import ExpenseDataVisualization from "../components/ExpenseDataVisualization";
import { FaTrash } from "react-icons/fa";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState({
    name: "",
    description: "",
    source: "",
    month: "",
    amount: "",
    type: "Debit",
  });

  const { cookies, refreshUserData, userData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [ledger, setLedger] = useState(null);

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    }
  }, [cookies.user, navigate]);

  useEffect(() => {
    if (userData) {
      setLedger(userData.ledger);
    }
  }, [userData]);

  const expenses = ledger
    ? ledger.filter((item) => item.type === "Debit")
    : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (name, amount) => {
    const confirmed = true;

    if (!confirmed) return;

    const response = await fetch("api/users/ledger/delete", {
      method: "DELETE",
      body: JSON.stringify({
        username: cookies.user,
        password: cookies.password,
        name: name,
        amount: amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (!response.success) {
      alert("There was an issue deleting the expense. Please try again later.");
      return;
    }

    alert("Expense record deleted successfully.");
    refreshUserData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const expenseData = {
      ...expense,
      month: expense.month || currentMonth,
    };

    const response = await fetch("api/users/ledger", {
      method: "POST",
      body: JSON.stringify({
        username: cookies.user,
        password: cookies.password,
        data: expenseData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (!response.success) {
      alert(
        "There was some issue while submitting the form. Please try again later."
      );
      return;
    }

    refreshUserData();

    setExpense({
      name: "",
      description: "",
      source: "",
      month: "",
      amount: "",
      type: "Debit",
    });
  };

  return (
    <div className="expense_tracker">
      <div className="mainExpense">
        <div className="viewExpenses">
          <ul className="ulViewExpenses">
          <h2>Previous History</h2>
            {ledger ? (
              ledger
                .filter((item) => item.type === "Debit")
                .map((item, index) => (
                  <li key={index}>
                    <div className="liName1">
                      <div className="liFirst">
                        <span>{item.name}</span>
                        <span>₹{item.amount}</span>
                      </div>
                      <div id="liSecondLine">
                        <span>{item.month.slice(0, 3)}</span>
                        <svg
                          fill="#FFFFFF"
                          onClick={() => handleDelete(item.name, item.amount)}
                          viewBox="0 0 64 64"
                          width={25}
                          id="deleteButton"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"></path>
                          <path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"></path>
                          <path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"></path>
                          <path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"></path>
                          <path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"></path>
                          <path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"></path>
                        </svg>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <li>Empty</li>
            )}
          </ul>
        </div>

        <form
          className="tracker_form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>Record Expense</h2>
          <div className="expenseBox">
            <input
              type="text"
              name="name"
              value={expense.name}
              onChange={handleChange}
              required
              placeholder="Name"
              autoComplete="off"
              className="text-box"
            />
          </div>
          <div className="expenseBox">
            <textarea
              name="description"
              value={expense.description}
              onChange={handleChange}
              rows={1}
              placeholder="Description"
              autoComplete="off"
              className="text-box"
            />
          </div>
          <div className="expenseBox">
            <input
              type="text"
              name="source"
              value={expense.source}
              onChange={handleChange}
              required
              placeholder="Purpose"
              autoComplete="off"
              className="text-box"

            />
          </div>
          <div className="expenseBox">
            <select
              name="month"
              value={expense.month}
              onChange={handleChange}
              className="text-box"
              autoComplete="off"
              required={true}
              onSubmit={handleSubmit}
            >
              <option value="">Select month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="expenseBox">
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
              min="1"
              placeholder="Amount ₹"
              autoComplete="off"
              className="text-box"

            />
          </div>
          <button type="submit" className="button1">Record Expense</button>
        </form>
      </div>

      <div className="graph-container">
        <ExpenseDataVisualization expenses={expenses} />
      </div>
    </div>
  );
};

export default ExpenseTracker;
