import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { Transaction } from "../common/types";

const AddTransactionModal = () => {
  const {
    isAddTransactionModalOpen,
    setIsAddTransactionModalOpen,
    setTransactions,
    setTransactionAction,
    transactionAction,
    transactions,
  } = useContext(expenseTrackerDataContext);

  const [money, setMoney] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isIncome, setIsIncome] = useState<boolean>(true);
  const [id, setId] = useState<number>(Date.now());

  // Category Lists
  const incomeCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Business",
    "Gifts",
    "Rental Income",
    "Dividends",
    "Other",
  ];

  const expenseCategories = [
    "Food & Groceries",
    "Transport & Fuel",
    "Entertainment",
    "Shopping",
    "Health & Medical",
    "Utilities",
    "Education",
    "Travel",
    "Insurance",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (transactionAction.id === null) {
      const newTransaction: Transaction = {
        id,
        money: Number(money),
        category,
        description,
        isIncome,
        date,
      };
      setTransactions((prevTransactions: any[]) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } else {
      const duplicateTransactions = [...transactions];
      const updateTransaction = duplicateTransactions.find(
        (trans: any) => trans.id === transactionAction.id
      );
      if (updateTransaction) {
        updateTransaction.category = category;
        updateTransaction.money = Number(money);
        updateTransaction.isIncome = isIncome;
        updateTransaction.description = description;
        updateTransaction.date = date;
      }

      setTransactions(duplicateTransactions);
    }

    setMoney("");
    setCategory("");
    setDescription("");
    setIsIncome(true);
    setDate("kik,,ll;p");

    setTransactionAction({
      id: null,
      action: null,
    });
    setIsAddTransactionModalOpen(false);
  };

  const handleCancel = () => {
    setTransactionAction({
      id: null,
      action: null,
    });
    setIsAddTransactionModalOpen(false);
  };

  const getTransactionTitleText = () => {
    switch (transactionAction.action) {
      case "EDIT":
        return "Edit Transaction";
      case "DELETE":
        return "Delete Transaction";
      default:
        return "Add Transaction";
    }
  };

  const getSaveOrDeleteText = () => {
    switch (transactionAction.action) {
      case "EDIT":
        return "Save Transaction";
      case "DELETE":
        return "Delete Transaction";
      default:
        return "Add Transaction";
    }
  };

  useEffect(() => {
    if (transactionAction.id && transactionAction.action != null) {
      const editTransactionItem: any = transactions.find(
        (tran) => tran.id === transactionAction.id
      );

      setId(editTransactionItem?.id);
      setMoney(editTransactionItem?.money);
      setCategory(editTransactionItem?.category);
      setDate(editTransactionItem?.date);
      setDescription(editTransactionItem?.description);
      setIsIncome(editTransactionItem?.isIncome);
    }
  }, [transactionAction]);

  return (
    <div>
      <Modal
        title=" "
        open={isAddTransactionModalOpen}
        onCancel={handleCancel}
        // okButtonProps={{ color: "red" }}
        // okText={null}
        footer={null}
        maskClosable={false}
      >
        <div className="flex flex-col">
          <div className="flex border border-white w-full m-auto  justify-center rounded-2xl p-2 mb-3">
            {getTransactionTitleText()}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:w-1/2 m-auto w-full px-8"
          >
            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              placeholder="Enter money"
              className="border border-green-400 rounded-lg p-2.5  outline-none box-border"
              required
            />

            {/* Toggle Button (Income / Expense) */}
            <button
              type="button"
              onClick={() => {
                setIsIncome(!isIncome);
                setCategory(""); // Reset category when toggling
              }}
              className="border border-gray-900 rounded-xl flex   items-center overflow-hidden"
            >
              <div
                className={`w-1/2 p-2 ${
                  isIncome ? "" : "bg-red-500 text-white"
                }`}
              >
                Expense
              </div>
              <div
                className={`w-1/2 p-2  ${isIncome ? "bg-green-600   " : ""}`}
              >
                Income
              </div>
            </button>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="border border-green-400 rounded-lg p-2.5  outline-none box-border"
            >
              <option value="" disabled>
                Select Category
              </option>
              {(isIncome ? incomeCategories : expenseCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="border border-green-400 rounded-lg p-2.5  outline-none box-border"
            />

            {/* Date Picker */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border border-green-400 rounded-lg p-2.5  outline-none box-border w-full"
            />

            <button
              type="submit"
              className="w-1/2 m-auto p-2 bg-purple-700 text-white rounded-xl"
            >
              {getSaveOrDeleteText()}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddTransactionModal;
