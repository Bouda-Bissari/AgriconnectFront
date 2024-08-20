/* eslint-disable react/prop-types */
import imagePath from "../configs/imageUrl.js";
import images from "../assets/index.jsx";
import axiosClient from "@/configs/axiosClient.js";
import { Button } from "@/components/ui/button.jsx";
import { useToast } from "@/components/ui/use-toast"
// import { toast } from 'react-toastify';
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

const StatusBadge = ({ status }) => {
  const statusStyles = {
    accepted: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
    canceled: "bg-yellow-500 text-black",
    pending: "bg-gray-500 text-white",
  };

  return (
    <div
      className={`w-full h-full p-4 flex items-center justify-center text-xl rounded-lg font-semibold ${
        statusStyles[status] || "bg-gray-500 text-white"
      }`}
    >
      {status === "accepted"
        ? "Acceptée"
        : status === "rejected"
        ? "Rejetée"
        : status === "canceled"
        ? "Annulée"
        : "En attente"}
    </div>
  );
};

const ClickPas = ({
  id,
  title,
  description,
  image,
  price,
  phoneNumber,
  email,
  create_at,
  fullName,
  message,
  status,
  setStatusUpdated,
}) => {
  const { toast } = useToast()

  const role = localStorage.getItem("USER_ROLES");
  console.log(role);




  
  const updateStatus = async (newStatus) => {
    try {
      const response = await axiosClient.put(`/candidatures/${id}/status`, {
        status: newStatus,
      });
      // alert(response.data.message);
      console.log(response)

      setStatusUpdated(true);
      // Vous pouvez ajouter une logique pour mettre à jour l'état local ou rediriger l'utilisateur ici
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la candidature:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

const handleAccept = () => {updateStatus("accepted");
  toast({
    position: "top-right",
    className:"text-2xl",
    title: "Action réussie",
    description: "Le statut a été mis à jour avec succès.",
    status: "success",
    isClosable: true,
    icon: '✔️', 
    style: {
      backgroundColor: '#4caf50', // Couleur de fond
      color: '#fff',
      fontFamily:'poesten'
    },
    
    transition: 'Bounce',
    
  });
};
  const handleReject = () => updateStatus("rejected");

  return (
    <section className="container w-4/5 mx-auto max-w-6xl rounded-lg bg-gray-900 text-white shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 border-4 rounded-xl p-5">
          <h1
            className="text-4xl font-bold text-center"
            style={{ fontFamily: "poetsen" }}
          >
            {title || "Titre non disponible"}
          </h1>
          <p className="text-lg text-center">
            {description || "Description non disponible"}
          </p>

          <div className="space-y-4">
            {phoneNumber && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 mr-2 text-gray-400"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="font-semibold">{phoneNumber}</span>
              </div>
            )}

            {email && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 mr-2 text-gray-400"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="font-semibold">{email}</span>
              </div>
            )}

            {create_at && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <span className="font-semibold">
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
                  className="w-6 h-6 mr-2 text-gray-400"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 6.586l4.293-4.293a1 1 111.414 1.414L11 8.414l4.293 4.293a1 1 01-1.414 1.414L10 9.828l-4.293 4.293a1 1 01-1.414-1.414L9.828 10l-4.293-4.293a1 1 010-1.414z" />
                </svg>
                <span className="font-semibold">Message : {message}</span>
              </div>
            )}

            {fullName && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12.75v3.75a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-3.75M6.75 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"
                  />
                </svg>
                <span className="font-semibold">Nom complet : {fullName}</span>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>

            <p className=" font-semibold">Prix: {formatPrice(price)}</p>
          </div>

          {role && role.includes("exploitant") && (
            <div className="flex space-x-4 mt-4">
              <Button
              variant="outline"
                onClick={handleAccept}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Accepter
              </Button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
              >
                Rejeter
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          {image ? (
            <img
              src={image ? `${imagePath}/${image}` : images.person}
              alt="Illustration de la candidature"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <img
              src={images.defaultImage}
              alt="Image par défaut"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          )}

          <StatusBadge status={status} />
        </div>
      </div>
    </section>
  );
};

export default ClickPas;
