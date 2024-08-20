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
  }, [token]);

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path)
      ? "block py-2 px-3 text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg md:bg-orange-500 md:text-white md:p-2 md:dark:text-white"
      : "block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-2 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white";
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
    <nav className="bg-white p-0 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 shadow-md " style={{ fontFamily: "poetsen" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={images.logo} className="h-[3rem] w-[6rem]" alt="Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <div className="relative">
              <button
                type="button"
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-full focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600"
                aria-expanded={isUserMenuOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white  dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="sr-only">Open user menu</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50">
                  <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.fullName}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to={`/profil/${userId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={onLogout}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                Se Connecter
              </Link>
              <Link
                to="/choix"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700"
              >
                S&apos;inscrire
              </Link>
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
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-green-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/acceuil"
                id="link"
                className={isActive("/acceuil")}
                aria-current={location.pathname.startsWith("/acceuil") ? "page" : undefined}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                id="link"
                className={isActive("/services")}
                aria-current={location.pathname.startsWith("/services") ? "page" : undefined}
              >
                Publications
              </Link>
            </li>
            <li>
              <Link
                to="/ouvriers"
                id="link"
                className={isActive("/ouvriers")}
                aria-current={location.pathname.startsWith("/ouvriers") ? "page" : undefined}
              >
                Ouvriers
              </Link>
            </li>

            {token && roles.includes("exploitant") && (
              <li>
                <Link
                  id="link"
                  to="/profil/createservice"
                  className={isActive("/profil/createservice")}
                >
                  Poster offre
                </Link>
              </li>
            )}
            {token && roles.includes("ouvrier") && (
              <li>
                <Link
                  id="link"
                  to="/search-offers"
                  className={isActive("/search-offers")}
                >
                  Rechercher des offres
                </Link>
              </li>
            )}
            {token && (
              <li>
                <Link
                  to="/profil"
                  id="link"
                  className={isActive("/profil")}
                  aria-current={location.pathname.startsWith("/profil") ? "page" : undefined}
                >
                  Mon Profil
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
