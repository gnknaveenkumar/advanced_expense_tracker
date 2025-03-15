import { useContext, useState } from "react";
import { Transaction } from "../common/types";
import { FaFolderPlus, FaFolderMinus } from "react-icons/fa";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";

const BalanceInfo = () => {
  const { balance, expense, income } = useContext(expenseTrackerDataContext);

  return (
    <div className="flex flex-col gap-6 p-4 ">
      <div className="flex flex-col items-center">
        <div className="text-base text-gray-500">Account Balance</div>
        <div className="text-3xl font-bold">{balance}</div>
      </div>
      <div className="flex  justify-around">
        <div className="flex justify-center items-center gap-3 p-2 w-40 bg-green-500 rounded-2xl text-white">
          <div>
            <FaFolderPlus size={30} />
          </div>
          <div className="flex flex-col">
            <span className="text-base">Income</span>
            <span className="text-lg">{income}</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 p-2 w-40 bg-green-500 rounded-2xl text-white ">
          <div>
            <FaFolderMinus size={30} />
          </div>
          <div className="flex flex-col">
            <span className="text-base">Expenses</span>
            <span className="text-lg">{expense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfo;
