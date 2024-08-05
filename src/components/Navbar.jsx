import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axiosClient.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, setUser, setToken } = useStateContext();

  const onLogout = (ev) => {
    ev.preventDefault();

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
  }, [setUser, token]);

  const location = useLocation();

  // Fonction pour définir un style si le lien est actif ou non
  const isActive = (path) => {
    return location.pathname === path
      ? "block py-2 px-3 text-white bg-orange-700 hover:bg-orange-800  focus:outline-none focus:ring-orange-300 font-medium rounded-lg md:bg-orange-500 md:text-white  md:p-2 md:dark:text-white p-4"
      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-2 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 p-4";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fermer le menu lorsque la route change
    setIsOpen(false);
  }, [location.pathname]);

  useGSAP(() => {
    // Animation
    var tl = gsap.timeline();
    tl.from(".logo", {
      y: -60,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
    }).from("#link", {
      y: -60,
      duration: 1,
      delay: 0.5,
      stagger: 0.2,
    });
    gsap.from("#title", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      scale: 0.2,
    });
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white logo"
            style={{ fontFamily: "poetsen" }}
          >
            🌾 AgriConnect
          </span>
        </a>
        <div
          className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
          style={{ fontFamily: "poetsen" }}
        >
          {token ? (
            <button
              id="link"
              type="button"
              onClick={onLogout}
              className="text-white bg-orange-300 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-2">
              <Link
                id="link"
                to="/login"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Se Connecter
              </Link>
              <Link
                id="link"
                to="/choix"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                S&apos;inscrire
              </Link>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
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
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            style={{ fontFamily: "poetsen" }}
          >
            <li>
              <Link
                to="/acceuil"
                id="link"
                className={isActive("/acceuil")}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                id="link"
                to="/services"
                className={isActive("/services")}
                aria-current={
                  location.pathname === "/services" ? "page" : undefined
                }
              >
                Offres
              </Link>
            </li>            <li>
              <Link
                id="link"
                to="/postulants"
                className={isActive("/postulant")}
                aria-current={
                  location.pathname === "/postulants" ? "page" : undefined
                }
              >
              Candidats
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                id="link"
                className={isActive("/users")}
                aria-current={
                  location.pathname === "/users" ? "page" : undefined
                }
              >
                Users
              </Link>
            </li>
            {token && (
              <li>
                <Link
                  to="/profile"
                  id="link"
                  className={isActive("/profile")}
                  aria-current={
                    location.pathname === "/profile" ? "page" : undefined
                  }
                >
                  {user.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
