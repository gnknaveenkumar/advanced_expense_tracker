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
import {
  ExpenseTrackerContext,
  expenseTrackerDataContext,
} from "./contexts/expenseTrackerContext";

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [balance, setBalance] = useState<number>(0);
  // const [income, setIncome] = useState<number>(0);
  // const [expense, setExpense] = useState<number>(0);
  const {
    balance,
    setBalance,
    income,
    setIncome,
    expense,
    setExpense,
    transactions,
    setTransactions,
  } = useContext(expenseTrackerDataContext);

  return (
    <div className="bg-slate-300">
      <ExpenseTrackerContext>
        <Router>
          <Routes>
            <Route path="/" element={<PageContainer />}>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transactions />} />
              {/* <Route path="/addTransaction" element={<AddTransaction />} /> */}
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
