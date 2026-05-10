import React from "react";
import "../styles/FinancialDataVisualization.css"
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA4FE2",
  "#E24F6F",
];

const FinancialDataVisualization = ({ ledger }) => {
  if (!ledger) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No ledger data available
      </div>
    );
  }


  ledger = ledger?.filter((item) => item.type === "Credit");

  const incomeData = Object.entries(
    ledger.reduce((acc, entry) => {
      if (entry && entry.source && entry.amount) {
        const normalizedSource = entry.source
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        acc[normalizedSource] =
          (acc[normalizedSource] || 0) + Number(entry.amount);
      }
      return acc;
    }, {})
  )
    .map(([source, amount]) => ({
      source,
      amount: Number(amount),
      percentage: 0,
    }))
    .filter((item) => item.amount > 0);

  const total = incomeData.reduce((sum, item) => sum + item.amount, 0);
  incomeData.forEach((item) => {
    item.percentage = ((item.amount / total) * 100).toFixed(1);
  });

  if (incomeData.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No valid income data to display
      </div>
    );
  }

  return (
    <div className="main_content">
      <h2 className="text-2xl font-bold mb-4 text-center">Income Sources</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={incomeData}
            dataKey="amount"
            nameKey="source"
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false}
          >
            {incomeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const item = incomeData.find((d) => d.amount === value);
              return [`${item.percentage}%`, name];
            }}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "4px",
              padding: "8px",
            }}
          />
          <Legend
            formatter={(value, entry) => {
              const item = incomeData.find((d) => d.source === value);
              return `${value} (${item.percentage}%)`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialDataVisualization;
