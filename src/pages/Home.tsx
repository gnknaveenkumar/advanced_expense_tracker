import { NavLink } from "react-router-dom";
import { Transaction } from "../common/types";
import BalanceInfo from "../components/BalanceInfo";
import RecentTransactions from "../components/RecentTransactions";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 md:w-1/2 m-auto w-full">
      <div className=" h-48 border-b-4 border-gray-300 bg-purple-100 rounded-b-2xl">
        <BalanceInfo />
      </div>
      <div className="flex justify-between px-3">
        <span>Recent Transaction</span>
        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
        >
          View All
        </NavLink>
      </div>
      <RecentTransactions />
    </div>
  );
};

export default Home;
