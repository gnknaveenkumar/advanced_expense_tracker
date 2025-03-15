import { createContext, FC, useEffect, useState } from "react";
import { Transaction } from "../common/types";

const expenseTrackerDataContext = createContext<{
  name: string;
  setName: Function;
  transactions: Array<Transaction>; // any[]
  setTransactions: Function;
  balance: number;
  setBalance: Function;
  dob: string;
  setDob: Function;
  income: number;
  setIncome: Function;
  expense: number;
  setExpense: Function;
}>({
  name: "",
  setName: () => {},
  transactions: [],
  setTransactions: () => {},
  balance: 0,
  setBalance: () => {},
  dob: "",
  setDob: () => {},
  income: 0,
  setIncome: () => {},
  expense: 0,
  setExpense: () => {},
});

type props = {
  children: React.ReactNode;
};

const ExpenseTrackerContext: FC<props> = ({ children }) => {
  const [name, setName] = useState<string>(" Your Name ");
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [balance, setBalance] = useState<number>(0);
  const [dob, setDob] = useState<string>("DD-MM-YYYY");
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const STORAGE_KEY = "transactions";

  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_KEY);
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (transactions.length === 0) return;
    console.log(" t ", transactions);

    // const lastTransaction = transactions.at(-1);
    // if (!lastTransaction) return;
    const income = transactions.length
      ? transactions
          .filter((t) => t.isIncome)
          .reduce((total, t) => total + t.money, 0)
      : 0;

    const expense = transactions.length
      ? transactions
          .filter((t) => !t.isIncome)
          .reduce((total, t) => total + t.money, 0)
      : 0;

    setBalance(income - expense);

    setIncome(income);

    setExpense(expense);
  }, [transactions]);

  console.log("balance", balance);
  console.log("income", income);
  console.log("expense", expense);
  return (
    <expenseTrackerDataContext.Provider
      value={{
        name,
        setName,
        transactions,
        setTransactions,
        balance,
        setBalance,
        dob,
        setDob,
        income,
        setIncome,
        expense,
        setExpense,
      }}
    >
      {children}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
