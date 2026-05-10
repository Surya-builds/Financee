import React, { useContext, useEffect } from "react";
import IncomeForm from "../components/IncomeForm";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import IncomeDataVisualization from "../components/IncomeDataVisualization";

const IncomeManagement = () => {
  // Get login state from context and cookies

  const { isLoggedIn, userData } = useContext(LoginContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  const ledger = userData ? userData.ledger : null;

  return (
    <>
      <IncomeForm />
      <IncomeDataVisualization ledger={ledger} />
    </>
  );
};

export default IncomeManagement;
