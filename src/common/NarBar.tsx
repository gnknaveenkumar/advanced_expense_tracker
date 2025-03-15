import { Link, NavLink } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Statictics from "../pages/Statictics";
import Transactions from "../pages/Transactions";
import { IoIosAddCircleOutline } from "react-icons/io";

const NavBar = () => {
  return (
    <div className="flex justify-around gap-5 border-indigo-500 m-2  bg-gray-200 items-center">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
      >
        Transactions
      </NavLink>
      <NavLink
        to="/addTransaction"
        className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
      >
        <IoIosAddCircleOutline size={32} color="green" />
      </NavLink>
      <NavLink
        to="/statictics"
        className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
      >
        Statistics
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "text-blue-500  " : "")}
      >
        Profile
      </NavLink>
    </div>
  );
};

export default NavBar;
