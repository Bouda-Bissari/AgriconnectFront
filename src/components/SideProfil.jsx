import { Link } from "react-router-dom";
import axiosClient from "../configs/axiosClient";
import { UserContext } from "../contexts/ContextProvider";
import images from "../assets/index.jsx";

const SideProfil = () => {
  const userId = JSON.parse(localStorage.getItem("USER_ID"));
  const { setUser, setToken, roles } = UserContext();

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className="hidden w-full md:block h-screen bg-gray-100 dark:bg-gray-800">
      <div className="sticky top-0 h-full p-4 text-sm border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-y-auto">
        
        <Link to="/" className="flex items-center justify-center mb-2 p-5 space-x-3 rtl:space-x-reverse bg-orange-200 rounded-lg hover:bg-orange-300">
          <img src={images.logo} className="h-[4rem] w-[8rem]" alt="Logo" />
        </Link>

        <Link
          to={`/profil/${userId}`}
          className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Votre Profil
        </Link>

        {roles.includes("exploitant") && (
          <Link
            to={`/profil/user/${userId}/services`}
            className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Mes Publications
          </Link>
        )}

        <Link
          to="/profil/user/candidature"
          className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Mes Candidatures
        </Link>

        <Link
          to="/profil/exploitant/candidature"
          className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Candidatures Reçues
        </Link>

        <Link
          to="/profil/notifications"
          className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Notifications
        </Link>

        <Link
          to="/"
          className="block px-4 py-2 mb-2 font-semibold text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Page d&apos;Accueil
        </Link>

        <button
          onClick={onLogout}
          className="w-full px-4 py-2 mt-4 text-sm font-semibold bg-red-500 rounded text-white hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
        >
          Se Déconnecter
        </button>
      </div>
    </div>
  );
};

export default SideProfil;
