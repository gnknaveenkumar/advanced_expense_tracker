import { Modal, Radio } from "antd";
import { useContext, useState } from "react";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { deleteAllOptions } from "../utility/constants";

const DeleteAllTransactionModal = ({ onDeleteAllConfirm }: any) => {
  const {
    selectedMonth,
    isDeleteAllTransactionModalOpen,
    setIsDeleteAllTransactionModalOpen,
    setSelectedClreadBy,
  } = useContext(expenseTrackerDataContext);
  const [selecdedDeleteOption, setSelecdedDeleteOption] = useState<string>(
    deleteAllOptions.BY_MONTH
  );
  const onChageControl = (e: any) => {
    setSelectedClreadBy(e.target.value);
    setSelecdedDeleteOption(e.target.value);
  };

  const onCancel = () => {
    setIsDeleteAllTransactionModalOpen(false);
    setSelecdedDeleteOption(deleteAllOptions.BY_MONTH);
  };
  return (
    <div>
      <Modal
        title={
          <div style={{ textAlign: "center", width: "100%" }}>Delete All</div>
        }
        open={isDeleteAllTransactionModalOpen}
        onCancel={() => {
          setIsDeleteAllTransactionModalOpen(false);
        }}
        footer={null}
      >
        <div className=" my-4 m-auto font-bold">
          <p>Are you sure you want to delete all ?</p>
        </div>

        <Radio.Group
          name="radiogroup"
          value={selecdedDeleteOption}
          onChange={(e) => onChageControl(e)}
          className="mb-4"
          options={[
            {
              value: deleteAllOptions.BY_MONTH,
              label: `Delete ${selectedMonth}'s Transactions`,
            },
            { value: deleteAllOptions.ALL, label: "Delete All Transactions" },
          ]}
        />

        <div className="flex justify-around">
          <button
            className="bg-slate-600 text-white rounded-2xl w-16 p-1.5"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={() => onDeleteAllConfirm(selecdedDeleteOption)}
            className="bg-red-500 text-white rounded-2xl w-16 p-1.5"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAllTransactionModal;
