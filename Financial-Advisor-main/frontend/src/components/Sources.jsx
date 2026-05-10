import { React, useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";

const Sources = ({ setIncome, Income }) => {
  const { userData } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    const fetchLedger = async () => {
      if (userData && userData.ledger) {
        let ledgerData = await userData.ledger;
        setLedger(ledgerData.filter((item) => item.type === "Credit"));
      }
      setLoading(false);
    };

    fetchLedger();
  }, [userData]);

  const uniqueArray = ledger.reduce((accumulator, currentValue) => {
    if (!accumulator.some((item) => item.source === currentValue.source)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

  const handleSources = (e) => {
    setIncome({ ...Income, source: e.target.textContent });
    document.getElementById("source").value = e.target.textContent;
  };

  return (
    <div className="sources">
      <h2>Sources</h2>
      <ul className="sources_list">
        {loading ? (
          <li>Loading...</li>
        ) : uniqueArray.length === 0 ? (
          <li>No Sources Available</li>
        ) : (
          uniqueArray.map((l, index) => {
            return (
              <li onClick={handleSources} key={index}>
                {l.source}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Sources;
