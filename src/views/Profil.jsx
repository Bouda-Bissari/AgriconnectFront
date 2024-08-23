import { Navigate, Outlet } from "react-router-dom";
import SideProfil from "../components/SideProfil";
import { AlertCompleted } from "@/components/AlertCompleted";
import { UserContext } from "@/contexts/ContextProvider";
import { Toaster } from "@/components/ui/toaster";

const Profil = () => {
  const { token } = UserContext();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="bg-white w-full h-full flex">
      {/* Fixed SideProfil as a vertical navigation bar */}
      <div className="fixed top-0 left-0 h-full w-1/5 md:border-2 ">
        <SideProfil />
      </div>

      {/* Main content area */}
      <div className="  h-full mx-auto ">
        <AlertCompleted />
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default Profil;
