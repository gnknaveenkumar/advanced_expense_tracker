import { createContext, FC, useEffect, useState } from "react";
import { Transaction, TransactionType } from "../common/types";
import AddTransactionModal from "../components/AddTransactionModal";
import DeleteTransactionModal from "../components/DeleteTransactionModal";
import { json } from "react-router-dom";
import {
  getClearTitle,
  getFilteredTransactionsByMonth,
  getMonthAndYear,
} from "../utility/utils";

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
  months: Array<string>;
  setMonths: Function;
  filteredTransactions: Array<any>;
  setFilteredTransactions: Function;
  selectedMonth: string;
  setSelectedMonth: Function;
  selectedClearyBy: string;
  setSelectedClreadBy: Function;
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
  months: [],
  setMonths: () => {},
  filteredTransactions: [],
  setFilteredTransactions: () => {},
  selectedMonth: "",
  setSelectedMonth: () => {},
  selectedClearyBy: "",
  setSelectedClreadBy: () => {},
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
  const [months, setMonths] = useState<string[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any>([]);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedClearyBy, setSelectedClreadBy] = useState<string>("");
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
    const storedTransactionsStr = localStorage.getItem(STORAGE_KEY);
    const storedName = localStorage.getItem(STORAGE_KEY_NAME);
    const storedDOB = localStorage.getItem(STORAGE_KEY_DOB);
    if (storedTransactionsStr) {
      setTransactions(JSON.parse(storedTransactionsStr));
    }

    if (storedName) {
      setName(storedName);
    }

    if (storedDOB) {
      setDob(storedDOB);
    }

    // update months
    updateMonths(storedTransactionsStr || "");
  }, []);

  const updateMonths = (storedTransactions: string) => {
    let filteredMonths: string[] = [];
    if (storedTransactions) {
      filteredMonths = getFilteredTransactionsByMonth(
        JSON.parse(storedTransactions)
      );
    }
    const currentMonth = getMonthAndYear(
      new Date(Date.now()).toISOString().slice(0, 10)
    );

    if (!filteredMonths.includes(currentMonth)) {
      filteredMonths = [currentMonth, ...filteredMonths];
    }
    setMonths(filteredMonths);
    setSelectedMonth(filteredMonths[0]);
  };

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(
        (trans) => getMonthAndYear(trans.date) === selectedMonth
      )
    );
  }, [selectedMonth, transactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

      let filteredMonths = getFilteredTransactionsByMonth(transactions);
      const currentMonth = getMonthAndYear(
        new Date(Date.now()).toISOString().slice(0, 10)
      );

      if (!filteredMonths.includes(currentMonth)) {
        filteredMonths = [currentMonth, ...filteredMonths];
      }
      setMonths(filteredMonths);
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
    if (transactions.length === 0) {
      setIncome(0);
      setExpense(0);
      setBalance(0);

      return;
    }

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

  const onDeleteConfirm = () => {
    if (transactionAction.action === "DELETE") {
      const updatedTransactions = transactions.filter(
        (trans: any) => trans.id !== transactionAction.id
      );
      setTransactions(updatedTransactions);
    }
    if (isClearAllTransactions) {
      if (selectedClearyBy === "All") {
        setTransactions([]);
        localStorage.removeItem("transactions");
        setIncome(0);
        setBalance(0);
        setExpense(0);
      } else if (selectedClearyBy === "Selected_Month") {
        const updatedTransactions = transactions.filter(
          (trans) => getMonthAndYear(trans.date) !== selectedMonth
        );
        setTransactions(updatedTransactions);
      }
      setIsClearAllTransactions(false);
    }
    setTransactionAction({
      id: null,
      action: null,
    });
    SetIsDeleteTransactionModalOpen(false);
  };

  const onCancelCinfirm = () => {
    setTransactionAction({
      id: null,
      action: null,
    });
    setIsClearAllTransactions(false);
    SetIsDeleteTransactionModalOpen(false);
  };

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
        months,
        setMonths,
        filteredTransactions,
        setFilteredTransactions,
        selectedMonth,
        setSelectedMonth,
        selectedClearyBy,
        setSelectedClreadBy,
      }}
    >
      {children}
      {isAddTransactionModalOpen && <AddTransactionModal />}
      {isDeleteTransactionModalOpen && (
        <DeleteTransactionModal
          onCofirm={onDeleteConfirm}
          infoMessage={
            selectedClearyBy === "All"
              ? "Are you sure you want to delete all the transactions?"
              : selectedClearyBy === "Selected_Month"
              ? "Are you sure you want to delete selected month's transactions?"
              : "Are you sure you want to delete this transaction?"
          }
          title={getClearTitle(selectedClearyBy)}
          onConfirmBtnText={isClearAllTransactions ? "Delete All" : "Delete"}
          open={isDeleteTransactionModalOpen}
          onCancel={() => {
            onCancelCinfirm();
          }}
        />
      )}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
