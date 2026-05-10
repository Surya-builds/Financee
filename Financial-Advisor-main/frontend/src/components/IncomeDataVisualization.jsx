import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/IncomeChart.css";

const MonthlyIncomeChart = ({ ledger }) => {
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

  const processedData = months.map((month) => {
    const monthTransactions =
      ledger?.filter(
        (item) => item.type === "Credit" && item.month === month
      ) || [];


    const totalAmount = monthTransactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );
    // console.log(`Month: ${month}, Total Amount:`, totalAmount);
    return {
      month,
      amount: totalAmount,
    };
  });

  const formatYAxisTick = (value) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  const formatToINR = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2 className="chart-title">Monthly Income Overview</h2>
      </div>
      <div className="chart-content">
        {!ledger || ledger.length === 0 ? (
          <div className="empty-state">
            <p className="empty-message">No income data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickFormatter={formatYAxisTick}
                label={{
                  value: "Amount",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                }}
              />
              <Tooltip
                formatter={(value) => formatToINR(value)}
                labelStyle={{ color: "#666" }}
              />
              <Bar
                dataKey="amount"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                name="Income"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MonthlyIncomeChart;
