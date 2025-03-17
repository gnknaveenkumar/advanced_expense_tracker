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
  } = useContext(expenseTrackerDataContext);

  const handleOk = () => {
    if (transactionAction.action === "DELETE") {
      const updatedTransactions = transactions.filter(
        (trans: any) => trans.id !== transactionAction.id
      );
      setTransactions(updatedTransactions);
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
    SetIsDeleteTransactionModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Delete Transaction"
        open={isDeleteTransactionModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div className="flex flex-col ">
          <p>Are You Sure..! </p>
          <p>Do you want to delete this transaction</p>

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
              Delete Transaction
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTransactionModal;
