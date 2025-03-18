import { useContext } from "react";
import {
  FaCircleArrowDown,
  FaCircleArrowUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../utility/utils";

const Transactions = () => {
  const {
    transactions,
    setTransactionAction,
    setIsAddTransactionModalOpen,
    SetIsDeleteTransactionModalOpen,
    setIsClearAllTransactions,
    isClearAllTransactions,
  } = useContext(expenseTrackerDataContext);

  const sortedTransactions = [...transactions].reverse();
  return (
    <div className="flex flex-col h-full p-2">
      {/* <div className="flex border border-white w-full   justify-center rounded-2xl my-2 p-2 items-center">
        Transaction History
      </div> */}

      <h1 className="text-center text-2xl font-bold mb-4">
        Transaction History
      </h1>
      <div className="flex justify-around">
        <button
          onClick={() => {
            setIsClearAllTransactions(true);
            console.log("setIsClearAllTransactions", isClearAllTransactions);
            SetIsDeleteTransactionModalOpen(true);
          }}
          className="border bg-red-500 text-white flex justify-center w-20 rounded-3xl items-center   mr-2 h-8 mb-2"
        >
          Clear All
        </button>
        <button
          onClick={() => {
            setIsAddTransactionModalOpen(true);
          }}
          className="border bg-green-500 text-white flex justify-center w-20 rounded-3xl items-center   mr-2 h-8 mb-2"
        >
          Add
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 p-2  border rounded-lg ">
        {sortedTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between border p-2 border-white rounded-2xl my-2"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{transaction.category}</span>
              <span className="text-gray-500 text-sm">
                {transaction.description}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <div className=" flex flex-col justify-end">
                <span
                  className={`font-semibold text-lg ${
                    transaction.isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.isIncome
                    ? `+ ${transaction.money}`
                    : `- ${transaction.money}`}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDate(transaction.date)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <FaRegEdit
                  size={20}
                  className="text-blue-500"
                  onClick={() => {
                    setIsAddTransactionModalOpen(true);
                    setTransactionAction({
                      id: transaction.id,
                      action: "EDIT",
                    });
                  }}
                />
                <MdDelete
                  size={24}
                  className="text-red-500"
                  onClick={() => {
                    SetIsDeleteTransactionModalOpen(true);
                    setTransactionAction({
                      id: transaction.id,
                      action: "DELETE",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
