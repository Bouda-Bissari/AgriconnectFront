import { Link, useLocation } from "react-router-dom";
import axiosClient from "../configs/axiosClient";
import { UserContext } from "../contexts/ContextProvider";
import images from "../assets/index.jsx";
import { useEffect, useState } from "react";
import ProfileCompletionAlert from "./ProfileCompletionAlert";
import { PublierBesoinDialog } from "./PublierBesoinDialog";

const SideProfil = () => {
  const userId = JSON.parse(localStorage.getItem("USER_ID"));
  const { setUser, setToken, roles, token } = UserContext();
  const location = useLocation();

  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(roles);
  // Fonction pour charger le nombre de notifications non lues
  const fetchUnreadCount = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/notifications");
      const unreadCount = response.data.filter(
        (notification) => !notification.read_at
      ).length;
      setUnreadCount(unreadCount);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des notifications", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUnreadCount(); // Charger les notifications au chargement du composant

  //   const intervalId = setInterval(fetchUnreadCount, 30000); // Rafraîchissement toutes les 30 secondes

  //   return () => clearInterval(intervalId); // Nettoyer l'intervalle au démontage
  // }, []); // Le tableau de dépendances vide assure que l'effet s'exécute une seule fois


  useEffect(()=>{
    fetchUnreadCount(); 
  },[])
  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const linkClasses = (path) =>
    `block px-4 py-2 mb-2 font-semibold rounded-lg ${
      location.pathname === path
        ? "bg-orange-300 dark:bg-orange-400"
        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
    }`;

  return (
    <div className="hidden w-full md:block h-screen bg-gray-100 dark:bg-gray-800 ">
      <div className="sticky top-0 h-full p-4 text-sm border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-y-auto ">
        <Link
          to="/"
          className="flex items-center justify-center mb-4 p-5 space-x-3 rtl:space-x-reverse bg-orange-200 rounded-lg hover:shadow-md"
        >
          <img src={images.logo} className="h-[4rem] w-[8rem]" alt="Logo" />
        </Link>

        <div className="flex flex-col gap-2">
          <Link
            to={`/profil/${userId}`}
            className={linkClasses(`/profil/${userId}`)}
          >
            Votre Profil
          </Link>

          {roles.includes("exploitant") && (
            <Link
              to={`/profil/user/${userId}/services`}
              className={linkClasses(`/profil/user/${userId}/services`)}
            >
              Mes Publications
            </Link>
          )}
          {roles.includes("ouvrier") && (
            <Link
              to="/profil/user/candidature"
              className={linkClasses("/profil/user/candidature")}
            >
              Mes Candidatures
            </Link>
          )}

          {token && roles.includes("exploitant") && (
            <Link
              to="/profil/exploitant/candidature"
              className={linkClasses("/profil/exploitant/candidature")}
            >
              Candidatures Reçues
            </Link>
          )}

          <Link
            to="/profil/notifications"
            className={`${linkClasses("/profil/notifications")} relative`}
          >
            Notifications
            {error ? (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Erreur
              </span>
            ) : (
              unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )
            )}
          </Link>
          {roles.includes("ouvrier") && (
           <PublierBesoinDialog />
          )}
        </div>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 mt-24 text-sm font-semibold bg-red-400 rounded text-white hover:bg-red-900 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
        >
          Se Déconnecter
        </button>
        
      </div>
      
    </div>
  );
};

export default SideProfil;
