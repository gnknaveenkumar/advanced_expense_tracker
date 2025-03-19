import { useContext, useEffect } from "react";
import {
  FaCircleArrowUp,
  FaIndianRupeeSign,
  FaCircleArrowDown,
} from "react-icons/fa6";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
const RecentTransactions = () => {
  const { transactions, isClearAllTransactions, setIsClearAllTransactions } =
    useContext(expenseTrackerDataContext);

  let lastTransactions = transactions.slice(-4).reverse();
  useEffect(() => {
    if (isClearAllTransactions) {
      lastTransactions = [];
      setIsClearAllTransactions(false);
    }
  }, [isClearAllTransactions]);
  return (
    <div>
      {lastTransactions.map((transaction, index) => (
        <div
          key={index}
          className={`flex justify-between p-3 border border-white rounded-xl h-16 my-2
          ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}`}
        >
          <div className="flex items-center gap-2">
            {transaction.isIncome ? (
              <FaCircleArrowUp size={30} color="green" />
            ) : (
              <FaCircleArrowDown size={30} color="red" />
            )}

            <div className="flex items-center">
              <FaIndianRupeeSign />
              <div className="text-xl"> {transaction.money}</div>
            </div>
          </div>

          <div className="text-gray-500">
            {transaction.isIncome ? "Income" : "Expense"}
          </div>
        </div>
      ))}
    </div>
    // <div>
    //   <div className="flex justify-between p-3 border border-white rounded-xl bg-gray-200 h-16 my-2">
    //     <div className="flex items-center justify-center gap-2">
    //       <FaCircleArrowUp size={30} color="green" />
    //       <div className="flex items-center justify-center">
    //         <FaIndianRupeeSign />
    //         <div className="text-xl"> 15000</div>
    //       </div>
    //     </div>
    //     <div className="text-gray-500"> Income</div>
    //   </div>
    //   <div className="flex justify-between p-3 border border-white rounded-xl bg-gray-200 h-16 mb-2">
    //     <div className="flex items-center justify-center gap-2">
    //       <FaCircleArrowDown size={30} color="red" />
    //       <div className="flex items-center justify-center">
    //         <FaIndianRupeeSign />
    //         <div className="text-xl"> 15000</div>
    //       </div>
    //     </div>
    //     <div className="text-gray-500"> Income</div>
    //   </div>
    //   <div className="flex justify-between p-3 border border-white rounded-xl bg-gray-200 h-16 mb-2">
    //     <div className="flex items-center justify-center gap-2">
    //       <FaCircleArrowUp size={30} color="green" />
    //       <div className="flex items-center justify-center">
    //         <FaIndianRupeeSign />
    //         <div className="text-xl"> 15000</div>
    //       </div>
    //     </div>
    //     <div className="text-gray-500"> Income</div>
    //   </div>
    //   <div className="flex justify-between p-3 border border-white rounded-xl bg-gray-200 h-16 mb-2">
    //     <div className="flex items-center justify-center gap-2">
    //       <FaCircleArrowDown size={30} color="red" />
    //       <div className="flex items-center justify-center">
    //         <FaIndianRupeeSign />
    //         <div className="text-xl"> 15000</div>
    //       </div>
    //     </div>
    //     <div className="text-gray-500"> Income</div>
    //   </div>
    // </div>
  );
};

export default RecentTransactions;
