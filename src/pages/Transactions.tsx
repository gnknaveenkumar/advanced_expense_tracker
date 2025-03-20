import { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { MdDelete } from "react-icons/md";
import {
  getFilteredTransactionsByMonth,
  getMonthAndYear,
  getTransactionSummaryByTypes,
} from "../utility/utils";
import { Transaction } from "../common/types";
import { Select } from "antd";

const Transactions = () => {
  const {
    setTransactionAction,
    setIsAddTransactionModalOpen,
    SetIsDeleteTransactionModalOpen,
    setIsClearAllTransactions,
    selectedMonth,
    setSelectedMonth,
    filteredTransactions,
    setSelectedClreadBy,
    selectedClearyBy,
    months,
  } = useContext(expenseTrackerDataContext);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedMonth(selected);
  };

  console.log("setSelectedClreadBy", selectedClearyBy);

  const onChage = (value: string) => {
    setSelectedClreadBy(value);
    setIsClearAllTransactions(true);
    SetIsDeleteTransactionModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-2">
      <h1 className="text-center text-2xl font-bold mb-4">
        Transaction History
      </h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ml-4 mb-2">
          {/* <label className="font-bold">Filter by Month:</label> */}

          <Select
            className="w-24"
            placeholder="Month"
            value={selectedMonth}
            style={{ width: "100px" }}
            onChange={(value) => setSelectedMonth(value)}
            options={months.map((month, index) => ({
              label: month,
              value: month,
            }))}
          ></Select>
        </div>
        <div className="flex justify-end">
          {/* <button
            onClick={() => {
              setIsClearAllTransactions(true);
              SetIsDeleteTransactionModalOpen(true);
            }}
            className="border bg-red-500 text-white flex justify-center w-20 rounded-3xl items-center   mr-2 h-8 mb-2"
          >
            Clear All
          </button> */}
          <p>Clear </p>
          <Select
            defaultValue="Clear All"
            onChange={onChage}
            style={{ width: 120 }}
            options={[
              { value: "All", label: "All" },
              { value: " By Month", label: "By Month" },
            ]}
          />
          <button
            onClick={() => {
              setIsAddTransactionModalOpen(true);
            }}
            className="border bg-green-500 text-white flex justify-center w-20 rounded-3xl items-center   mr-2 h-8 mb-2"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 p-2  border rounded-lg ">
        {filteredTransactions.map((transaction: any, index: number) => (
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
