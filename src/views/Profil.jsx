import { Outlet } from "react-router-dom";
import SideProfil from "../components/SideProfil";
import { AlertCompleted } from "@/components/AlertCompleted";

const Profil = () => {
  return (
    <div className="bg-white w-full border-2 border-green-500 flex  flex-col       md:flex-row text-[#161931]">
      <SideProfil />
<div className="mt-10 mx-auto w-full">
<AlertCompleted />
<Outlet />

</div>
    </div>
  );
};

export default Profil;
