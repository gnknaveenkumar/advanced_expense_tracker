import React from "react";
import { exportToExcel } from "../utility/exportToExcel";

const transactions = [
  {
    id: 1,
    date: "2025-03-11",
    category: "Salary",
    amount: 5000,
    type: "Income",
  },
  {
    id: 2,
    date: "2025-03-10",
    category: "Groceries",
    amount: 100,
    type: "Expense",
  },
  { id: 3, date: "2025-03-09", category: "Fuel", amount: 50, type: "Expense" },
  {
    id: 4,
    date: "2025-03-08",
    category: "Bonus",
    amount: 2000,
    type: "Income",
  },
  {
    id: 5,
    date: "2025-03-07",
    category: "Dining",
    amount: 300,
    type: "Expense",
  },
  {
    id: 6,
    date: "2025-03-06",
    category: "Freelance",
    amount: 1500,
    type: "Income",
  },
  {
    id: 7,
    date: "2025-03-05",
    category: "Rent",
    amount: 1200,
    type: "Expense",
  },
  {
    id: 8,
    date: "2025-03-04",
    category: "Investment",
    amount: 700,
    type: "Income",
  },
  {
    id: 9,
    date: "2025-03-03",
    category: "Shopping",
    amount: 450,
    type: "Expense",
  },
  {
    id: 10,
    date: "2025-03-02",
    category: "Transport",
    amount: 75,
    type: "Expense",
  },
];

const ExportData: React.FC = () => {
  return (
    <div className="  border border-gray-300 rounded-lg ">
      <h2 className="text-lg font-bold mb-4">Export Your Data</h2>
      <button
        onClick={() => exportToExcel(transactions, "Expense_Tracker_Data")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default ExportData;
