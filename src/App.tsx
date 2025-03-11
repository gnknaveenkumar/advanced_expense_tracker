import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import PageContainer from "./layouts/PageContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./pages/Transactions";
import Statictics from "./pages/Statictics";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import { Transaction } from "./common/types";
import { ExpenseTrackerContext } from "./contexts/expenseTrackerContext";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  useEffect(() => {
    if (transactions.length === 0) return;

    const lastTransaction = transactions.at(-1);
    if (!lastTransaction) return;

    setBalance((prevBalance) =>
      lastTransaction.isIncome
        ? prevBalance + lastTransaction.money
        : prevBalance - lastTransaction.money
    );

    setIncome((prevIncome) =>
      lastTransaction.isIncome ? prevIncome + lastTransaction.money : prevIncome
    );

    setExpense((prevExpense) =>
      lastTransaction.isIncome
        ? prevExpense
        : prevExpense + lastTransaction.money
    );
  }, [transactions]);

  console.log("balance", balance);
  console.log("income", income);
  console.log("expense", expense);

  return (
    <div className="bg-slate-300">
      <ExpenseTrackerContext>
        <Router>
          <Routes>
            <Route path="/" element={<PageContainer />}>
              <Route path="/" element={<Home transactions={transactions} />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route
                path="/addTransaction"
                element={
                  <AddTransaction onAddTransaction={handleAddTransaction} />
                }
              />
              <Route path="/statictics" element={<Statictics />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </ExpenseTrackerContext>
    </div>
  );
}

export default App;
