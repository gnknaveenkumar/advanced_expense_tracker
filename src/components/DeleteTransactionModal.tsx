import useConfig from "antd/es/config-provider/hooks/useConfig";
import { useContext } from "react";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { Modal } from "antd";

const DeleteTransactionModal = () => {
  const {
    isDeleteTransactionModalOpen,
    SetIsDeleteTransactionModalOpen,
    transactionAction,
    transactions,
    setTransactionAction,
    setTransactions,
    isClearAllTransactions,
    setIsClearAllTransactions,
    setBalance,
    setIncome,
    setExpense,
    setFilteredTransactions,
  } = useContext(expenseTrackerDataContext);

  const handleOk = () => {
    if (transactionAction.action === "DELETE") {
      const updatedTransactions = transactions.filter(
        (trans: any) => trans.id !== transactionAction.id
      );
      setTransactions(updatedTransactions);
    }
    console.log("isclearalltrue", isClearAllTransactions);
    if (isClearAllTransactions) {
      setFilteredTransactions([]);
      localStorage.removeItem("transactions");
      setIncome(0);
      setBalance(0);
      setExpense(0);
      setIsClearAllTransactions(false);
    }
    setTransactionAction({
      id: null,
      action: null,
    });
    SetIsDeleteTransactionModalOpen(false);
  };

  const handleCancel = () => {
    setTransactionAction({
      id: null,
      action: null,
    });
    setIsClearAllTransactions(false);
    SetIsDeleteTransactionModalOpen(false);
  };

  return (
    <div>
      <Modal
        title={
          isClearAllTransactions
            ? "Clear All Transactions"
            : "Delete Transaction"
        }
        open={isDeleteTransactionModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div className="flex flex-col ">
          <p>Are You Sure..! </p>
          <p>
            {isClearAllTransactions
              ? "Do you want to clear all the transactions?"
              : "Do you want to delete this transaction?"}
          </p>

          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-700 p-1 rounded-2xl text-white w-16 px-2"
            >
              Cancel
            </button>
            <button
              onClick={handleOk}
              className=" bg-red-500 text-white h-7 px-2 rounded-2xl"
            >
              {isClearAllTransactions ? "Clear All" : "Delete Transaction"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTransactionModal;
