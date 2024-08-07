import { Outlet } from "react-router-dom";
import SideProfil from "../components/SideProfil";

const Profil = () => {
  return (
    <div className="bg-white w-full border-2 border-green-500 flex  flex-col       md:flex-row text-[#161931]">
      <SideProfil />
      <Outlet />
    </div>
  );
};

export default Profil;
