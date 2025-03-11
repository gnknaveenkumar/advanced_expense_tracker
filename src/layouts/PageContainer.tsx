import { ReactNode } from "react";
import Header from "../common/Header";
import NavBar from "../common/NarBar";
import { Outlet } from "react-router-dom";

interface PageContainerProps {
  children: ReactNode;
}
const PageContainer: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="h-16 border border-red-100">
        <Header />
      </div>

      <div>
        <Outlet />
      </div>
      <div className="p-2 bg-gray-100 text-center fixed bottom-0 w-full flex justify-around">
        <NavBar />
      </div>
    </div>
  );
};

export default PageContainer;
