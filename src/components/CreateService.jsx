import { useState } from "react";
import axios from "../configs/axiosClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/contexts/ContextProvider";
import { ConfirmationDialog } from "./ConfirmationDialog";

const CreateService = () => {
  const userId = JSON.parse(localStorage.getItem("USER_ID"));
  const { toast } = useToast();
  const {isCompleted,setRoles} = UserContext()
  const handleConfirm = async () => {
     handleSubmit();
  };
  
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
  const navigate = useNavigate();




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

  const handleSubmit = async () => {
  
    const formData = new FormData();
    for (const key in serviceData) {
      if (serviceData[key]) { // Vérifier si la valeur existe avant de l'ajouter
        formData.append(key, serviceData[key]);
      }
    }
  
    try {
      // Envoyer les données via Axios
      const response = await axios.post("/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRoles(response.data.roles); 
      // Afficher une alerte de succès
      setAlert({ type: "success", message: "Service créé avec succès !" });
      toast({
        position: "top-right",
        className: "text-2xl",
        title: "Action réussie",
        description: "Offre créée avec succès.",
        status: "success",
        isClosable: true,
        icon: "✔️",
        style: {
          backgroundColor: "#4caf50",
          color: "#fff",
          fontFamily: "poetsen",
        },
        transition: "Bounce",
      });
  
      // Rediriger l'utilisateur après 2 secondes
      setTimeout(() => {
        navigate(`/profil/user/${userId}/services`);
      }, 2000);
    } catch (error) {
      // Afficher une alerte d'erreur et loguer les détails de l'erreur
      setAlert({ type: "error", message: "Erreur lors de la création du service." });
      console.error("Erreur de création de service:", error.response ? error.response.data : error);
    }
  };
  

  const serviceTypeOptions = {
    work: "Main d'oeuvre",
    material: "Produit",
  };
  if(isCompleted){

  return (

    <div className="mt-20">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h3
          className="text-2xl text-center font-bold text-orange-900 dark:text-white mb-4"
          style={{ fontFamily: "poetsen" }}
        >
          Créer un Service
        </h3>
        {/* Affichage de l'alerte */}
        {alert.message && (
          <div
            className={`alert ${alert.type === "success" ? "bg-green-500" : "bg-red-500"} text-white p-4 rounded-lg mb-4`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
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
                {Object.entries(serviceTypeOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
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
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lieu</label>
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

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
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
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 file:border-0 file:bg-gray-100 file:text-gray-900 file:rounded-lg file:p-2.5 focus:ring-orange-500 focus:border-orange-500"
                
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
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

          {/* <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-medium text-white bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-400"
          >
            Publier
          </button> */}
                    <ConfirmationDialog onConfirm={handleConfirm} />




        </form>
      </div>
    </div>
  );
}
};

export default CreateService;
