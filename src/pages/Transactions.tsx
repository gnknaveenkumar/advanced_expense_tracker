import {
  FaCircleArrowDown,
  FaCircleArrowUp,
  FaIndianRupeeSign,
} from "react-icons/fa6";

const Transactions = () => {
  const transactions = [
    {
      money: 2500,
      isIncome: true,
      category: "Salary",
      description: "Monthly Salary",
      date: "2025-03-01",
    },
    {
      money: 200,
      isIncome: false,
      category: "Food",
      description: "Dinner at Restaurant",
      date: "2025-03-02",
    },
    {
      money: 1500,
      isIncome: true,
      category: "Freelance",
      description: "Website Development",
      date: "2025-03-03",
    },
    {
      money: 300,
      isIncome: false,
      category: "Shopping",
      description: "New Shoes",
      date: "2025-03-04",
    },
    {
      money: 4500,
      isIncome: true,
      category: "Bonus",
      description: "Performance Bonus",
      date: "2025-03-05",
    },
    {
      money: 100,
      isIncome: false,
      category: "Snacks",
      description: "Evening Snacks",
      date: "2025-03-06",
    },
    {
      money: 700,
      isIncome: false,
      category: "Fuel",
      description: "Petrol Refill",
      date: "2025-03-07",
    },
    {
      money: 1200,
      isIncome: true,
      category: "Investment",
      description: "Stock Market Return",
      date: "2025-03-08",
    },
    {
      money: 80,
      isIncome: false,
      category: "Coffee",
      description: "Starbucks Coffee",
      date: "2025-03-09",
    },
    {
      money: 500,
      isIncome: false,
      category: "Entertainment",
      description: "Movie Night",
      date: "2025-03-10",
    },
  ];

  const sortedTransactions = [...transactions].reverse();
  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex border border-white w-full   justify-center rounded-2xl my-2 p-2">
        Transaction History
      </div>
      <div className="flex-1 overflow-y-auto pr-2 p-2  border rounded-lg">
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

            <div className=" flex flex-col">
              <span
                className={`font-semibold text-lg ${
                  transaction.isIncome ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.isIncome
                  ? `+ ${transaction.money}`
                  : `- ${transaction.money}`}
              </span>
              <span className="text-gray-500 text-sm">{transaction.date}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-between border p-2 border-white rounded-2xl">
        <div className="flex flex-col">
          <span>Shopping</span>
          <span>Buy some groceries</span>
        </div>
        <div> - 530</div>
      </div> */}
    </div>
  );
};

export default Transactions;
