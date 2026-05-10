import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

const ExpenseDataVisualization = ({ expenses }) => {
  const expenseData = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return [];
    }

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

    return months.map((month) => ({
      month,
      amount: expenses
        .filter((expense) => expense.month === month)
        .reduce((acc, curr) => acc + Number(curr.amount), 0),
    }));
  }, [expenses]);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No expenses data available
      </div>
    );
  }

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
    <div className="mainExpense1">
      <h2 className="text-2xl font-bold mb-4 text-center">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={expenseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatYAxisTick} />
          <Tooltip formatter={(value) => formatToINR(value)} />
          <Legend />
          <Bar dataKey="amount" fill={COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseDataVisualization;