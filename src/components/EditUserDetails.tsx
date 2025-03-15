import { useContext, useState } from "react";
import {
  ExpenseTrackerContext,
  expenseTrackerDataContext,
} from "../contexts/expenseTrackerContext";

const EditUserDetails = () => {
  const { name, setName, dob, setDob } = useContext(expenseTrackerDataContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>("");
  const [formDob, setFormDob] = useState<string>("");

  const onCancelFunction = () => {
    setName(name);
    setDob(dob);
    setFormName(name);
    setFormDob(dob);
    setIsEdit(false);
  };

  const onSubmitFunction = () => {
    setName(formName);
    setDob(formDob);
    setIsEdit(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="m-auto">Edit User Details</div>
      <div className="mt-2">
        {isEdit ? (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              value={formDob}
              onChange={(e) => setFormDob(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-around">
              <button
                onClick={onCancelFunction}
                className="bg-red-500 text-white py-2 rounded w-20 hover:bg-blue-600"
              >
                Cancel
              </button>

              <button
                onClick={onSubmitFunction}
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-20"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end ">
              <button
                className=" p-2 border border-while rounded-xl w-20  bg-blue-500 text-white"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <strong className="min-w-[120px]">Name</strong>
                <span>{name}</span>
              </div>
              <div className="flex">
                <strong className="min-w-[120px]">Date of Birth</strong>
                <span>{dob}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserDetails;
