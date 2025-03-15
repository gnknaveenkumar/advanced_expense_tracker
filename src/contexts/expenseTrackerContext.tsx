import { createContext, FC, useState } from "react";

const expenseTrackerDataContext = createContext<{
  name: string;
  setName: Function;
  transaction: Array<any>; // any[]
  setTransaction: Function;
  balance: number;
  setBalance: Function;
  dob: string;
  setDob: Function;
}>({
  name: "",
  setName: () => {},
  transaction: [],
  setTransaction: () => {},
  balance: 0,
  setBalance: () => {},
  dob: "",
  setDob: () => {},
});

type props = {
  children: React.ReactNode;
};

const ExpenseTrackerContext: FC<props> = ({ children }) => {
  const [name, setName] = useState<string>(" lol ");
  const [transaction, setTransaction] = useState<Array<any>>([]);
  const [balance, setBalance] = useState<number>(0);
  const [dob, setDob] = useState<string>("DD-MM-YYYY");

  return (
    <expenseTrackerDataContext.Provider
      value={{
        name,
        setName,
        transaction,
        setTransaction,
        balance,
        setBalance,
        dob,
        setDob,
      }}
    >
      {children}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
