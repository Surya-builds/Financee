import React, { useContext, useEffect, useState } from "react";
import "../styles/IncomeForm.css";
import { LoginContext } from "../contexts/LoginContext";
import Sources from "./Sources";

const IncomeForm = () => {
  const [income, setIncome] = useState({
    name: "",
    description: "",
    source: "",
    month: "",
    amount: "",
    type: "Credit",
  });

  // Get the cookie data
  const { cookies, refreshUserData, userData } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const incomeData = {
      ...income,
      month: income.month || currentMonth, // Use current month if not provided
    };

    // Send the data to the backend
    const response = await fetch("api/users/ledger", {
      method: "POST",
      body: JSON.stringify({
        username: cookies.user,
        password: cookies.password,
        data: incomeData,
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

    // Refresh the user data
    refreshUserData();
    
    setIncome({
      name: "",
      description: "",
      source: "",
      month: "",
      amount: "",
      type: "Credit",
    });
  };
  let [ledger, setLedger] = useState(null);
  useEffect(() => {
    if (userData) {
      setLedger(userData.ledger.filter((item) => item.type === "Credit"));
    } else {
      return;
    }
  }, [userData]);
  const handleDelete = async (item) => {
    try {
      const response = await fetch("api/users/ledger/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cookies.user,
          password: cookies.password,
          name: item.name,
          amount: item.amount,
        }),
      });
      
      const result = await response.json();

      if (response.ok) {
        alert("Entry successfully deleted !");
        refreshUserData();
      } else {
        alert(
          result.message ||
            "There was an issue deleting the ledger entry. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an issue deleting the ledger entry. Please try again later."
      );
    }
  };

  return (
    <div className="mainHeadIncome">
      <div className="viewSources">
        <div className="innerViewSources">
          <h2>Previous History</h2>
          <ul className="ulViewSources">
            {ledger ? (
              ledger.map((item, index) => {
                return (
                  <li key={index}>
                    <span className="liName">{item.name}</span>
                    <span>{item.month.slice(0, 3)}</span>{" "}
                    <span>₹{item.amount}</span>
                    <svg
                      fill="#000000"
                      viewBox="0 0 64 64"
                      data-name="Layer 1"
                      id="Layer_1"
                      width={25}
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => handleDelete(item)}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <title></title>
                        <path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"></path>
                        <path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"></path>
                        <path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"></path>
                        <path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"></path>
                        <path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"></path>
                        <path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"></path>
                      </g>
                    </svg>
                  </li>
                );
              })
            ) : (
              <li>Empty</li>
            )}
          </ul>
        </div>
      </div>
      <form className="income-form" onSubmit={handleSubmit} autoComplete="off">
  <h2>Record Income</h2>
  <div className="HeadLabelRows">
    <label className="label-rows">
      <input
        type="text"
        name="name"
        value={income.name}
        onChange={handleChange}
        required
        className="text-box"
        placeholder="Name"
        autoComplete="off"
      />
    </label>
    <label className="label-rows">
      <textarea
        name="description"
        value={income.description}
        onChange={handleChange}
        className="text-box"
        rows={1}
        cols={2}
        placeholder="Description"
        autoComplete="off"
      ></textarea>
    </label>
    <label className="label-rows">
      <input
        type="text"
        name="source"
        value={income.source}
        onChange={handleChange}
        id="source"
        required
        className="text-box"
        placeholder="Source"
        autoComplete="off"
      />
    </label>
    <label className="label-rows">
      <select
        name="month"
        value={income.month}
        onChange={handleChange}
        className="text-box"
        autoComplete="off"
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
    </label>
    <label className="label-rows">
      <input
        type="number"
        name="amount"
        value={income.amount}
        onChange={handleChange}
        required
        min="1"
        className="text-box"
        placeholder="Amount ₹"
        autoComplete="off"
      />
    </label>
    <button type="submit" className="button1 record_btn">
      Record Income
    </button>
  </div>
</form>


      <div className="presentSources">
        <Sources setIncome={setIncome} Income={income} />
      </div>
    </div>
  );
};

export default IncomeForm;
