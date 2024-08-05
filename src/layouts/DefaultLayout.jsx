import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function DefaultLayout() {


  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="mt-10">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
