import { createContext, FC, useState } from "react";

const expenseTrackerDataContext = createContext<{
  name: string;
  setName: Function;
  transaction: Array<any>; // any[]
  setTransaction: Function;
}>({ name: "", setName: () => {}, transaction: [], setTransaction: () => {} });

type props = {
  children: React.ReactNode;
};

const ExpenseTrackerContext: FC<props> = ({ children }) => {
  const [name, setName] = useState<string>(" lol ");
  const [transaction, setTransaction] = useState<Array<any>>([]);

  return (
    <expenseTrackerDataContext.Provider
      value={{
        name,
        setName,
        transaction,
        setTransaction,
      }}
    >
      {children}
    </expenseTrackerDataContext.Provider>
  );
};

export { expenseTrackerDataContext, ExpenseTrackerContext };
