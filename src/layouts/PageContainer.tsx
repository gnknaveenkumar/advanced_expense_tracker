import { ReactNode } from "react";
import Header from "../common/Header";
import NavBar from "../common/NavBar";
import { Outlet } from "react-router-dom";

interface PageContainerProps {
  children: ReactNode;
}
const PageContainer: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 border border-red-100   w-full bg-gray-100">
        <Header />
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <div className="py-2 bg-gray-100 text-center   w-full flex justify-around">
        <NavBar />
      </div>
    </div>
  );
};

export default PageContainer;
