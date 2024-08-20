import { Link } from "react-router-dom";
import images from "../assets/index.jsx";
import { Politique } from "./Politique.jsx";
import { Termes } from "./Termes.jsx";

function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src={images.logo}
                  className="h-[4rem] w-[8rem]"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2
                  className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                  style={{ fontFamily: "poetsen" }}
                >
                  Ressources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="/publications" className="hover:underline">
                      Publications
                    </Link>
                  </li>
                  <li>
                    <Link to="/aide" className="hover:underline">
                      Aide & Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                  style={{ fontFamily: "poetsen" }}
                >
                  Suivez-nous
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/votrecompte"
                      className="hover:underline "
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/votreprofil"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                  style={{ fontFamily: "poetsen" }}
                >
                  Légal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    {/* <Link to="/privacy-policy" className="hover:underline">
                      Politique de confidentialité
                    </Link> */}
                    <Politique />
                  </li>
                  <li>
                    {/* <Link to="/terms-conditions" className="hover:underline">
                      Termes & Conditions
                    </Link> */}
                    <Termes />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://votresite.com" className="hover:underline">
                VotreSite™
              </a>
              . Tous droits réservés.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
