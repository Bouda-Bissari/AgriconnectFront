import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <header>
        <Navbar />
      </header>

      {/* Main content area */}
      <main className="flex-grow mt-15">
        <Outlet />
        <Toaster />
      </main>

      {/* Footer at the bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
