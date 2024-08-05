import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section id="services" className="py-12 bg-gray-500 my-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white" style={{fontFamily:"poetsen",}}>
          Nos Services
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
            onClick={() => handleCardClick('/service-travail')}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-orange-600 " style={{fontFamily:"poetsen",}}>
              Offres de Travail
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Postulez aux offres de travail dans le domaine agricole.
            </p>
          </div>
          <div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
            onClick={() => handleCardClick('/service-materiel')}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-orange-600" style={{fontFamily:"poetsen",}}>
              Matériel Agricole
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300" >
              Trouvez et proposez du matériel agricole à louer ou à vendre.
            </p>
          </div>
          <div
            className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
            onClick={() => handleCardClick('/candidature')}
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-orange-600" style={{fontFamily:"poetsen",}}>
              Soumettre sa Candidature
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Soumettez votre candidature pour des opportunités dans le secteur agricole.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
