import { useNavigate } from "react-router-dom";

const ForYou = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="my-12 p-4 bg-gray-200">
      <h1
        className="text-3xl font-bold text-center mb-8 text-green-700"
        style={{ fontFamily: "poetsen" }}
      >
        Ce que nous faisons pour vous ?
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* First Card */}
        <div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2 cursor-pointer"
          onClick={() => handleCardClick("/services/work")}
        >
          <img
            src="src/assets/job.png"
            className="h-56 w-56 mb-4 transform hover:scale-105 transition-transform duration-300"
            alt="job"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Vous recherchez un emploi dans l’agriculture ?
          </h2>
          <p className="text-gray-600 text-center">
            Postulez aux offres de travail dans le domaine agricole.
          </p>
        </div>

        {/* Second Card */}
        <div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2 cursor-pointer"
          onClick={() => handleCardClick("/profil/createservice")}
        >
          <img
            src="src/assets/People.png"
            className="h-56 w-56 mb-4 transform hover:scale-105 transition-transform duration-300"
            alt="entreprise"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Vous êtes une entreprise du secteur agricole ?
          </h2>
          <p className="text-gray-600 text-center">
            Vous recherchez un.e stagiaire, un.e employé.e ?
            Déposez votre offre d&apos;emploi sur notre site.
          </p>
        </div>

        {/* Third Card */}
        <div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2 cursor-pointer"
          onClick={() => handleCardClick("/services/material")}
        >
          <img
            src="src/assets/farm.png"
            className="h-56 w-56 mb-4 transform hover:scale-105 transition-transform duration-300"
            alt="agriculture"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Vous cherchez du matériel Agricole ?
          </h2>
          <p className="text-gray-600 text-center">
            Trouvez et proposez du matériel agricole à louer ou à vendre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
