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

  useEffect(() => {
    if (transactions.length === 0) return;

    const lastTransaction = transactions.at(-1);
    if (!lastTransaction) return;

    setBalance((prevBalance: number) =>
      lastTransaction.isIncome
        ? prevBalance + lastTransaction.money
        : prevBalance - lastTransaction.money
    );

    setIncome((prevIncome: number) =>
      lastTransaction.isIncome ? prevIncome + lastTransaction.money : prevIncome
    );

    setExpense((prevExpense: number) =>
      lastTransaction.isIncome
        ? prevExpense
        : prevExpense + lastTransaction.money
    );
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
