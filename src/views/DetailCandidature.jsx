/* eslint-disable react/prop-types */
import imagePath from "../configs/imageUrl.js";
import images from "../assets/index.jsx";

const formatDate = (dateString) => {
  if (!dateString) return "Date non disponible";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatPrice = (price) => {
  if (price === undefined || price === null) return "Prix non spécifié";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "CFA",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const DetailCandidature = ({
  title,
  description,
  location,
  image,
  price,
  phoneNumber,
  email,
  create_at,
  fullName,
  deadline,
  updated_at,
  message,
  status,
}) => {
  const role = localStorage.getItem("USER_ROLES");
  console.log(role);

  return (
    <section className="container w-4/5 mx-auto rounded-sm py-6 bg-gray-900 dark:bg-gray-800 text-white dark:text-white">
      <div className="grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8 px-6 mx-auto lg:px-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center font-poetsen">
            {title || "Titre non disponible"}
          </h1>
          <p className="text-center text-lg">
            {description || "Description non disponible"}
          </p>

          <div className="space-y-1">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="font-bold">
                {location || "Localisation non spécifiée"}
              </span>
            </div>

            {phoneNumber && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="font-bold">{phoneNumber}</span>
              </div>
            )}

            {email && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="font-bold">{email}</span>
              </div>
            )}

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <p>
                <strong>Statut:</strong> {status ? "Acceptée" : "En attente"}
              </p>
            </div>

            {create_at && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 6.586l4.293-4.293a1 1 111.414 1.414L11 8.414l4.293 4.293a1 1 01-1.414 1.414L10 9.828l-4.293 4.293a1 1 01-1.414-1.414L9.828 10l-4.293-4.293a1 1 010-1.414z"></path>
                </svg>
                <span className="font-bold">
                  Postuler le : {formatDate(create_at)}
                </span>
              </div>
            )}

            {message && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 6.586l4.293-4.293a1 1 111.414 1.414L11 8.414l4.293 4.293a1 1 01-1.414 1.414L10 9.828l-4.293 4.293a1 1 01-1.414-1.414L9.828 10l-4.293-4.293a1 1 010-1.414z"></path>
                </svg>
                <span className="font-bold">Message : {message}</span>
              </div>
            )}

            {fullName && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path d="M10 2a2 2 0 00-2 2v4.586l-3.293-3.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 001.414 1.414L8 12.414V17a2 2 0 002 2h4a2 2 0 002-2v-4.586l3.293 3.293a1 1 001.414-1.414L11.414 10l4.293-4.293a1 1 00-1.414-1.414L10 8.586V4a2 2 0 00-2-2h-4z" />
                </svg>
                <span className="font-bold">{fullName}</span>
              </div>
            )}

            {price && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm5 3a1 1 0 000-2H5a1 1 0 000 2h3zm7-3a1 1 0 100-2h-1a1 1 0 100 2h1zm-6 2a1 1 0 100-2H6a1 1 0 000 2h2zm1 1a1 1 0 100-2H7a1 1 0 000 2h2zm2 1a1 1 0 100-2H8a1 1 0 000 2h2zm0-7a1 1 0 100-2H6a1 1 0 000 2h2zm0 2a1 1 0 100-2H7a1 1 0 000 2h2zm2 1a1 1 0 100-2H9a1 1 0 000 2h2zm0 2a1 1 0 100-2h-1a1 1 0 100 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">{formatPrice(price)}</span>
              </div>
            )}

            {deadline && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5h10a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1zm-1 4h12V7H4v2zm0 2v2h12v-2H4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">
                  Date limite : {formatDate(deadline)}
                </span>
              </div>
            )}

            {updated_at && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a1 1 0 001 1h2a1 1 0 011 1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V6a1 1 0 011-1h2a1 1 0 001-1V3a1 1 0 011-1zm1 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8a1 1 0 00-1-1H7zm1 2a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold">
                  Dernière mise à jour : {formatDate(updated_at)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          {image ? (
            <img
              src={`${imagePath}/${image}`}
              alt={title}
              className="w-full md:h-56 h-32 object-cover"
            />
          ) : (
            <img
              src={images.person}
              alt={title}
              className="h-screen w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {role.includes("postulant") && (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded-full"
              onClick={() => alert("Annuler la candidature")}
            >
              Annuler
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => alert("Modifier la candidature")}
            >
              Modifier
            </button>
          </>
        )}

        {role.includes("demandeur") && (
          <>
            <button
              className="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mr-4 rounded-xl"
              onClick={() => alert("Voir les CV")}
            >
              Accepter
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
              onClick={() => alert("Supprimer la candidature")}
            >
              Rejeter
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default DetailCandidature;
