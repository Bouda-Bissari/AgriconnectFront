import { useState, useEffect } from "react";
import axios from "../configs/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UpdateService = () => {
  const { jobId,Id } = useParams(); // Récupérer l'ID du service depuis les params
  const navigate = useNavigate();
  const { toast } = useToast();
console.log("Affichage de ID")
console.log(Id)

  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    service_type: "",
    deadline: "",
    location: "",
    price: "",
    image: null,
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  // Récupérer les données du service lors du chargement du composant
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`/services/${jobId}`);
        setServiceData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du service:", error);
        // Vous pouvez afficher une alerte ou gérer l'erreur ici
      }
    };

    fetchServiceData();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setServiceData({
      ...serviceData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in serviceData) {
      formData.append(key, serviceData[key]);
    }

    try {
      const response = await axios.put(`/services/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Afficher une alerte de succès
      setAlert({ type: "success", message: "Service mis à jour avec succès !" });
      toast({
        position: "top-right",
        className: "text-2xl",
        title: "Action réussie",
        description: "Service mis à jour avec succès.",
        status: "success",
        isClosable: true,
        icon: '✔️',
        style: {
          backgroundColor: '#4caf50', // Couleur de fond
          color: '#fff',
          fontFamily: 'poetsen'
        },
        transition: 'Bounce',
      });
      console.log(response.data);

      // Rediriger l'utilisateur
      setTimeout(() => {
        navigate(`/profil/user/${Id}/services`);
      }, 2000); // Délai de 2 secondes pour que l'utilisateur voie l'alerte
    } catch (error) {
      // Afficher une alerte d'erreur
      setAlert({ type: "error", message: "Erreur lors de la mise à jour du service." });
    }
  };

  const serviceTypeOptions = {
    work: "Main d'œuvre",
    material: "Produit",
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h3 className="text-2xl text-center font-bold text-orange-900 dark:text-white mb-4" style={{ fontFamily: "poetsen" }}>
          Mettre à Jour un Service
        </h3>
        {/* Affichage de l'alerte */}
        {alert.message && (
          <div className={`alert ${alert.type === "success" ? "bg-green-500" : "bg-red-500"} text-white p-4 rounded-lg mb-4`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={serviceData.title}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Titre du service"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                rows="4"
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Description du service"
                required
              ></textarea>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Type de Service
              </label>
              <select
                name="service_type"
                value={serviceData.service_type}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="" disabled>
                  Sélectionnez un type de service
                </option>
                {Object.entries(serviceTypeOptions).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date Limite
              </label>
              <input
                type="date"
                name="deadline"
                value={serviceData.deadline}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lieu
              </label>
              <input
                type="text"
                name="location"
                value={serviceData.location}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Lieu du service"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Prix
              </label>
              <input
                type="number"
                name="price"
                value={serviceData.price}
                onChange={handleChange}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Prix du service"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 file:border-0 file:bg-gray-100 file:text-gray-900 file:rounded-lg file:p-2.5 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-medium text-white bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-400"
          >
            Mettre à Jour le Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
