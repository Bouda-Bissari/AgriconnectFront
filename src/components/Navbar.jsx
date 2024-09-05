import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../configs/axiosClient.js";
import images from "../assets/index.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { token, user, setUser, setToken, roles = "" } = UserContext();
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "block py-2 px-3 text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg md:bg-orange-500 md:text-white md:p-2 md:dark:text-white"
      : "block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-2 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    // Close menus on route change
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md bg-white/80 py-3 shadow-lg backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg" style={{ fontFamily: "poetsen" }}>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={images.logo} className="h-9 w-auto" alt="Logo" />
          </Link>
          <div className="hidden md:flex md:items-center md:gap-5">
            <Link to="/acceuil" className={isActive("/acceuil")}>Accueil</Link>
            <Link to="/services" className={isActive("/services")}>Publications</Link>
            <Link to="/ouvriers" className={isActive("/ouvriers")}>Ouvriers</Link>
            {/* {token && roles.includes("exploitant") && (
              <Link to="/profil/createservice" className={isActive("/profil/createservice")}>Poster offre</Link>
            )} */}
            {/* {token && roles.includes("ouvrier") && (
              <Link to="/search-offers" className={isActive("/search-offers")}>Rechercher des offres</Link>
            )} */}
            {/* {token && (
              <Link to="/profil" className={isActive("/profil")}>Mon Profil</Link>
            )} */}
          </div>
          <div className="flex items-center space-x-3">
            {token ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleUserMenu}
                  className="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-full focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                    <div className="py-3 px-4">
                      <span className="block text-sm text-gray-900 dark:text-white">{user.fullName}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link to={`/profil/${userId}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profil</Link>
                      </li>
                      <li>
                        <button onClick={onLogout} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left">Deconnexion</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="rounded-xl bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-orange-800">Se Connecter</Link>
                <Link to="/choix" className="rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-green-800">S&apos;inscrire</Link>
              </div>
            )}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`mt-4 md:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 mt-4 space-y-2 font-medium border border-gray-100 rounded-lg bg-gray-50 text-black dark:bg-gray-800 dark:border-gray-700">
            <li><Link to="/acceuil" className={isActive("/acceuil")}>Accueil</Link></li>
            <li><Link to="/services" className={isActive("/services")}>Publications</Link></li>
            <li><Link to="/ouvriers" className={isActive("/ouvriers")}>Ouvriers</Link></li>
            {token && roles.includes("exploitant") && (
              <li><Link to="/profil/createservice" className={isActive("/profil/createservice")}>Poster offre</Link></li>
            )}
            {/* {token && roles.includes("ouvrier") && (
              <li><Link to="/search-offers" className={isActive("/search-offers")}>Rechercher des offres</Link></li>
            )} */}
            {/* {token && <li><Link to="/profil" className={isActive("/profil")}>Mon Profil</Link></li>} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
