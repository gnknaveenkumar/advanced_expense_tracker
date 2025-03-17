import { createContext, FC, useEffect, useState } from "react";
import { Transaction, TransactionType } from "../common/types";
import AddTransactionModal from "../components/AddTransactionModal";

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
  isAddTransactionModalOpen: boolean;
  setIsAddTransactionModalOpen: Function;
  transactionAction: TransactionType;
  setTransactionAction: Function;
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
  isAddTransactionModalOpen: false,
  setIsAddTransactionModalOpen: () => {},
  transactionAction: { id: null, action: null },
  setTransactionAction: () => {},
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
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [transactionAction, setTransactionAction] = useState<TransactionType>({
    id: null,
    action: null,
  });

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
        isAddTransactionModalOpen,
        setIsAddTransactionModalOpen,
        transactionAction,
        setTransactionAction,
      }}
    >
      {children}
      {isAddTransactionModalOpen && <AddTransactionModal />}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
