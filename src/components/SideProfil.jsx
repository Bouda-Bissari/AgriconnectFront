import axiosClient from "../configs/axiosClient";
import { UserContext } from "../contexts/ContextProvider";

const SideProfil = () => {
  const userId = JSON.parse(localStorage.getItem("USER_ID"));
  const {  setUser, setToken, role } = UserContext();
  // const role = localStorage.getItem("USER_ROLE");
  console.log(role);
  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div className="hidden  py-4 md:w-1/3 lg:w-1/4 md:block bg-green-500">
      <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
        <h2 className="pl-3 mb-4 text-2xl font-semibold">Gérer Votre Profil</h2>
        <a
          href={`/profil/${userId}`}
          className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full"
        >
          Votre Profil
        </a>
        {role.includes('demandeur') && (
          <a
            href={`/user/${userId}/services`}
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Offres
          </a>
        )}
        <a
          href={`/user/${userId}/services`}
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Candidatures
        </a>

        <a
          href="/login"
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Notifications
        </a>
        <a
          href="/"
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Page d&apos;acceuil
        </a>
        <button
          onClick={onLogout}
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideProfil;
