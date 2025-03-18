import { ReactNode } from "react";
import Header from "../common/Header";
import NavBar from "../common/NavBar";
import { Outlet } from "react-router-dom";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC = () => {
  return (
    <div className="flex flex-col  h-[100dvh] overflow-hidden">
      {/* Header Section */}
      <div className="h-16 border border-red-100 w-full bg-gray-100">
        <Header />
      </div>

      {/* Main Content Section with Scrollable Area */}
      <div className="flex-1 overflow-auto w-full min-w-0">
        <Outlet />
      </div>

      {/* Footer Section */}
      <div className="py-2 bg-gray-100 text-center w-full flex justify-around">
        <NavBar />
      </div>
    </div>
  );
};

export default PageContainer;
