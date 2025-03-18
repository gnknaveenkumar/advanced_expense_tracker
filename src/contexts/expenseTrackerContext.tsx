import { createContext, FC, useEffect, useState } from "react";
import { Transaction, TransactionType } from "../common/types";
import AddTransactionModal from "../components/AddTransactionModal";
import DeleteTransactionModal from "../components/DeleteTransactionModal";
import { json } from "react-router-dom";

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
  isDeleteTransactionModalOpen: boolean;
  SetIsDeleteTransactionModalOpen: Function;
  isClearAllTransactions: boolean;
  setIsClearAllTransactions: Function;
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
  isDeleteTransactionModalOpen: false,
  SetIsDeleteTransactionModalOpen: () => {},
  isClearAllTransactions: false,
  setIsClearAllTransactions: () => {},
});

type props = {
  children: React.ReactNode;
};

const ExpenseTrackerContext: FC<props> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [balance, setBalance] = useState<number>(0);
  const [dob, setDob] = useState<string>("");
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [transactionAction, setTransactionAction] = useState<TransactionType>({
    id: null,
    action: null,
  });

  const [isDeleteTransactionModalOpen, SetIsDeleteTransactionModalOpen] =
    useState<boolean>(false);

  const [isClearAllTransactions, setIsClearAllTransactions] =
    useState<boolean>(false);

  const STORAGE_KEY = "transactions";
  const STORAGE_KEY_NAME = "name";
  const STORAGE_KEY_DOB = "dob";

  useEffect(() => {
    const storedTransactions = localStorage.getItem(STORAGE_KEY);
    const storedName = localStorage.getItem(STORAGE_KEY_NAME);
    const storedDOB = localStorage.getItem(STORAGE_KEY_DOB);
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }

    if (storedName) {
      setName(storedName);
    }

    if (storedDOB) {
      setDob(storedDOB);
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (dob) {
      localStorage.setItem(STORAGE_KEY_DOB, dob);
    }
  }, [dob]);

  useEffect(() => {
    if (name) {
      localStorage.setItem(STORAGE_KEY_NAME, name);
    }
  }, [name]);

  useEffect(() => {
    if (transactions.length === 0) return;

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
        isDeleteTransactionModalOpen,
        SetIsDeleteTransactionModalOpen,
        isClearAllTransactions,
        setIsClearAllTransactions,
      }}
    >
      {children}
      {isAddTransactionModalOpen && <AddTransactionModal />}
      {isDeleteTransactionModalOpen && <DeleteTransactionModal />}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
