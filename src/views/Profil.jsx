import { Navigate, Outlet } from "react-router-dom";
import SideProfil from "../components/SideProfil";
import { UserContext } from "@/contexts/ContextProvider";
import { Toaster } from "@/components/ui/toaster";
import { AlertCompleted } from "@/components/AlertCompleted";
import CompleteProfileDiv from "@/components/ProfileCompletionDiv";

const Profil = () => {
  const { token } = UserContext();

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-white w-full h-full flex">
      {/* Fixed SideProfil as a vertical navigation bar */}
      <div className="fixed top-0 left-0 h-full w-1/5 md:border-2 ">
        <SideProfil />
      </div>
      <div className="top-0 left-0 h-full w-1/5 md:border-2 "></div>

      {/* Main content area */}
      <div className="  h-full mx-auto   grid place-items-start">
        <div className="">
          <CompleteProfileDiv />
        </div>
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default Profil;
