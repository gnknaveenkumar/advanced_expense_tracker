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

const Transactions = () => {
  // const transactions = [
  //   {
  //     money: 2500,
  //     isIncome: true,
  //     category: "Salary",
  //     description: "Monthly Salary",
  //     date: "2025-03-01",
  //   },
  //   {
  //     money: 200,
  //     isIncome: false,
  //     category: "Food",
  //     description: "Dinner at Restaurant",
  //     date: "2025-03-02",
  //   },
  //   {
  //     money: 1500,
  //     isIncome: true,
  //     category: "Freelance",
  //     description: "Website Development",
  //     date: "2025-03-03",
  //   },
  //   {
  //     money: 300,
  //     isIncome: false,
  //     category: "Shopping",
  //     description: "New Shoes",
  //     date: "2025-03-04",
  //   },
  //   {
  //     money: 4500,
  //     isIncome: true,
  //     category: "Bonus",
  //     description: "Performance Bonus",
  //     date: "2025-03-05",
  //   },
  //   {
  //     money: 100,
  //     isIncome: false,
  //     category: "Snacks",
  //     description: "Evening Snacks",
  //     date: "2025-03-06",
  //   },
  //   {
  //     money: 700,
  //     isIncome: false,
  //     category: "Fuel",
  //     description: "Petrol Refill",
  //     date: "2025-03-07",
  //   },
  //   {
  //     money: 1200,
  //     isIncome: true,
  //     category: "Investment",
  //     description: "Stock Market Return",
  //     date: "2025-03-08",
  //   },
  //   {
  //     money: 80,
  //     isIncome: false,
  //     category: "Coffee",
  //     description: "Starbucks Coffee",
  //     date: "2025-03-09",
  //   },
  //   {
  //     money: 500,
  //     isIncome: false,
  //     category: "Entertainment",
  //     description: "Movie Night",
  //     date: "2025-03-10",
  //   },
  // ];

  const { transactions, setTransactionAction, setIsAddTransactionModalOpen } =
    useContext(expenseTrackerDataContext);

  const sortedTransactions = [...transactions].reverse();
  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex border border-white w-full   justify-center rounded-2xl my-2 p-2 items-center">
        Transaction History
      </div>
      <button
        onClick={() => {
          setIsAddTransactionModalOpen(true);
        }}
        className="border bg-green-500 text-white flex justify-center w-20 rounded-3xl items-center ml-auto mr-2 h-8 mb-2"
      >
        Add
      </button>
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
                  {transaction.date}
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
                    setIsAddTransactionModalOpen(true);
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
