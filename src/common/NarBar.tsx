import { Link, NavLink } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Statictics from "../pages/Statictics";
import Transactions from "../pages/Transactions";

const NavBar = () => {
  return (
    <div className="flex justify-around gap-6 border-indigo-500 m-2 p-2 bg-gray-200">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Transactions
      </NavLink>
      <NavLink
        to="/addTransaction"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        +
      </NavLink>
      <NavLink
        to="/statictics"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Statistics
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold" : ""
        }
      >
        Profile
      </NavLink>
    </div>
  );
};

export default NavBar;
