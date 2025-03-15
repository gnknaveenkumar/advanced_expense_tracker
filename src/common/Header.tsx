import { useContext } from "react";
import { expenseTrackerDataContext } from "../contexts/expenseTrackerContext";
import { getFormattedDateAndDay, getFormattedMonth } from "../utility/utils";
import profilePic from "../profile_pic.jpg";

function Header() {
  const { name } = useContext(expenseTrackerDataContext);
  return (
    <div className="flex justify-between p-2 px-4 items-center">
      <div className="flex flex-col justify-around  ">
        <span>{getFormattedDateAndDay()}</span>
        <span>{getFormattedMonth()}</span>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <div>{name} </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
          <img
            src={profilePic}
            alt="pic"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
