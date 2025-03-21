import useConfig from "antd/es/config-provider/hooks/useConfig";
import { useContext } from "react";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { Modal } from "antd";

type DeleteTransactionModalProps = {
  onCofirm?: Function;
  infoMessage?: string;
  title?: string;
  onConfirmBtnText?: string;
  open: boolean;
  onCancel: Function;
};

const DeleteTransactionModal = ({
  infoMessage = "Are you sure ?",
  onCofirm = () => {},
  title = "Delete",
  onConfirmBtnText = "Delete",
  open,
  onCancel,
}: DeleteTransactionModalProps) => {
  return (
    <div>
      <Modal
        title={title}
        open={open}
        onCancel={() => {
          onCancel();
        }}
        maskClosable={false}
        footer={null}
      >
        <div className="flex flex-col ">
          <p> {infoMessage}</p>
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => onCancel()}
              className="bg-gray-700 p-1 rounded-2xl text-white w-16 px-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onCofirm();
              }}
              className=" bg-red-500 text-white h-7 px-2 rounded-2xl"
            >
              {onConfirmBtnText}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteTransactionModal;
