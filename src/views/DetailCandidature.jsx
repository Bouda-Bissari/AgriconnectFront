/* eslint-disable react/prop-types */
import imagePath from "../configs/imageUrl.js";
import images from "../assets/index.jsx";
import axiosClient from "@/configs/axiosClient.js";
import { useState } from "react";

const formatDate = (dateString) => {
  if (!dateString) return "Date non disponible";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


  // Fonction pour formater les numéros de téléphone
  const formatPhoneNumber = (phone) => {
    if (!phone || phone.length !== 11) return phone; // Vérifie si le numéro est valide
  
    const countryCode = phone.slice(0, 3); 
    const part1 = phone.slice(3, 5); 
    const part2 = phone.slice(5, 7); 
    const part3 = phone.slice(7, 9); 
    const part4 = phone.slice(9, 11); 
  
    return `+${countryCode} ${part1} ${part2} ${part3} ${part4}`;
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
    deleted: "bg-gray-600 text-white",
  };

  return (
    <div
      className={`w-full h-full  p-20 flex items-center justify-center text-2xl rounded  font-semibold ${
        statusStyles[status] || "bg-gray-500 text-white"
      }`}
      style={{ fontFamily: "poetsen" }}
    >
      {status === "accepted"
        ? "Acceptée"
        : status === "rejected"
        ? "Rejetée"
        : status === "canceled"
        ? "Annulée"
        : "En attente"}
      {/* <img src={images.canceled} className="w-full h-56 object-cover rounded-lg" alt="" /> */}
    </div>
  );
};

const DetailCandidature = ({
  id,
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
  const [isVisible, setIsVisible] = useState(true);

  const cancelCandidature = async () => {
    try {
      const response = await axiosClient.put(`/candidatures/${id}/status`, {
        status: "canceled",
      });
      alert(response.data.message);
      setIsVisible(false);
    } catch (error) {
      console.error("Erreur lors de l'annulation de la candidature:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const deleteCandidature = async () => {
    try {
      const response = await axiosClient.put(`/candidatures/${id}/status`, {
        status: "deleted",
      });
      alert(response.data.message);
      setIsVisible(false); 
    } catch (error) {
      console.error("Erreur lors de la suppression de la candidature:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (!isVisible) {
    return null; 
  }

  const renderButton = () => {
    switch (status) {
      case "accepted":
        return (
          <button
            disabled
            className="bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Acceptée
          </button>
        );
      case "rejected":
        return (
          <button
            disabled
            className="bg-red-600 text-white py-2 px-4 rounded w-3/4"
          >
            Rejetée
          </button>
        );
      case "canceled":
        return (
          <button
          disabled
            className="bg-yellow-600 text-white py-2 px-4 rounded w-full"
          >
            Annulée
          </button>
        );
      case "pending":
        return (
          <button
            disabled
            // onClick={cancelCandidature}
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded w-full"
          >
            En attente
          </button>
        );
      case "deleted":
        return (
          <button
            onClick={deleteCandidature}
            className="bg-gray-600 text-white py-2 px-4 rounded w-full"
          >
            Supprimée
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <section className="container ml-44 w-4/5 mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold" style={{ fontFamily: "poetsen" }}>
            {title || "Pas de titre"}
          </h1>
          <p className="text-lg">
            {description || "Description non disponible"}
          </p>

          <div className="space-y-2 ">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">
                {location || "Localisation non spécifiée"}
              </span>
            </div>



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
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      <span className="font-semibold">Nom : {fullName}</span>
                    </div>
                  )}



{email && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-400"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-semibold">{email}</span>
              </div>
            )}

            {phoneNumber && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-gray-400"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-semibold">{formatPhoneNumber(phoneNumber)}</span>
              </div>
            )}

{message && (
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
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>

                      <span className="font-semibold">Message : {message}</span>
                    </div>
                  )}



            {(status == "canceled" || status == "rejected") && (
              <div className="space-y-2">
                {status && (
                  <div className="flex justify-center items-center gap-3 ">
                    {renderButton()}
                    <button
                      onClick={deleteCandidature}
                      className="bg-orange-500 rounded p-2 flex justify-center items-center"
                    >
                      <svg
                        fill="#ffffff"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ffffff"
                        className="size-6"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path>
                        </g>
                      </svg>
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            )}

            {status !== "canceled" && status !== "rejected" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col space-y-4">
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




                  {price && (
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
                      <span className="font-semibold">
                        Prix : {formatPrice(price)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-4">
                  {deadline && (
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
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                      <span className="font-semibold">
                        Date limite : {formatDate(deadline)}
                      </span>
                    </div>
                  )}

                  {updated_at && (
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
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <span className="font-semibold">
                        Mis à jour le : {formatDate(updated_at)}
                      </span>
                    </div>
                  )}



                  
                </div>
              </div>
            )}


          </div>
        </div>

        <div className="space-y-4">
          <img
            src={image ? `${imagePath}/${image}` : images.person}
            alt={title}
            className="w-full h-56 object-cover rounded-lg"
          />
          {status !== "canceled" && status !== "rejected" && (
            <div className="space-y-2">
              {status && (
                <div className="flex justify-center">
                  <StatusBadge status={status} />
                </div>
              )}
            </div>
          )}

          {status !== "canceled" && status !== "rejected" && (
            <div className="flex gap-4 mt-6">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold flex justify-center items-center gap-1 py-1 rounded w-full"
                onClick={cancelCandidature}
              >
                <svg
                  width="204px"
                  height="204px"
                  viewBox="0 -0.5 17 17"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  stroke="#ffffff"
                  className="size-6"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>799</title> <defs> </defs>{" "}
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <path
                        d="M9.016,0.06 C4.616,0.06 1.047,3.629 1.047,8.029 C1.047,12.429 4.615,15.998 9.016,15.998 C13.418,15.998 16.985,12.429 16.985,8.029 C16.985,3.629 13.418,0.06 9.016,0.06 L9.016,0.06 Z M3.049,8.028 C3.049,4.739 5.726,2.062 9.016,2.062 C10.37,2.062 11.616,2.52 12.618,3.283 L4.271,11.631 C3.508,10.629 3.049,9.381 3.049,8.028 L3.049,8.028 Z M9.016,13.994 C7.731,13.994 6.544,13.583 5.569,12.889 L13.878,4.58 C14.571,5.555 14.982,6.743 14.982,8.028 C14.981,11.317 12.306,13.994 9.016,13.994 L9.016,13.994 Z"
                        fill="#ffffff"
                        className="si-glyph-fill"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailCandidature;
