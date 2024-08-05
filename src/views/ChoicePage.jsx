import { useNavigate } from "react-router-dom";

const ChoicePage = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate(`/register/${role}`);
  };

  return (
    <div className="dark:bg-gray-900 h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 max-w-4xl">
        {/* Carte Demandeur */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-500 dark:text-blue-400 mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Devenir Demandeur
          </h5>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            En tant que Demandeur, vous pouvez publier des demandes de
            main d&apos;œuvre ou de produits/matériels agricoles, pour trouver des
            travailleurs ou des clients qui répondent à vos besoins.
          </p>
          <button
            onClick={() => handleRoleSelection("demandeur")}
            className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Commencer
            <svg
              className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </button>
        </div>

        {/* Carte Postulant */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Devenir Postulant
          </h5>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            En tant que Postulant, vous avez la possibilité de consulter et
            postuler à des demandes de main d&apos;œuvre publiées sur la plateforme.
            Gérez facilement votre profil et suivez vos candidatures pour rester
            à jour sur les opportunités qui vous intéressent.
          </p>
          <button
            onClick={() => handleRoleSelection("postulant")}
            className="inline-flex items-center px-4 py-2 font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-300 ease-in-out"
          >
            Commencer
            <svg
              className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;
