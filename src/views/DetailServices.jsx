import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import images from "../assets/index.jsx";
import SkeletonDetailService from "../components/SkeletonDetailService.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl.js";
import { PostulerDialog } from "@/components/PostulerDialog.jsx";
import { AlertCompleted } from "@/components/AlertCompleted.jsx";
import { ReportAbuseDialog} from "@/components/ReportAbuseDialog.jsx"; // Importer le composant

// Fonction pour formater les prix en FCFA sans décimales
const formatPrice = (price) => {
  if (price === undefined || price === null) return "Prix non spécifié";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF", // Code pour le FCFA
    minimumFractionDigits: 0, // Pas de décimales
    maximumFractionDigits: 0,
  }).format(price);
};

const DetailServices = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { user, token } = UserContext();

  useEffect(() => {
    axios
      .get(`detailservice/${jobId}`)
      .then((response) => {
        setServiceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [jobId]);

  const handlePostuler = () => {
    axios
      .post("/candidature", {
        service_id: jobId,
        message: message,
      })
      .then((response) => {
        alert("Candidature créée avec succès");
        console.log(response.data);
        navigate(`/profil/user/candidature`);
      })
      .catch((error) => {
        alert("Erreur lors de la création de la candidature: " + error.message);
      });
  };

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <SkeletonDetailService />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!serviceData) {
    return <p>Pas de services disponibles</p>;
  }

  // Destructurer les données pour un accès plus facile
  const { title, description, location, image, price } = serviceData.service;
  const { phone_number } = serviceData.service.user || {};
  const { email } = serviceData.profiles || {};

  return (
    <div className="my-40">
      <section className="container mx-auto w-4/5 rounded-sm py-6 bg-green-900 text-white dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1
              className="text-4xl text-center"
              style={{ fontFamily: "poetsen" }}
            >
              {title}
            </h1>
            <p className="pt-2 pb-4 text-center">{description}</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="font-bold">{location}</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className="font-bold">{phone_number}</span>
              </p>
              {email && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span className="font-bold">{email}</span>
                </p>
              )}
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <span className="font-bold">{formatPrice(price)}</span>
              </p>
            </div>

            {user.is_completed ? (
              <form
                noValidate
                className="flex flex-col py-6 space-y-6 mt-3 md:py-0 md:px-6"
              >
                <label className="block">
                  <span className="mb-1">Message</span>
                  <textarea
                    rows="3"
                    className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-green-600 dark:bg-gray-100 text-black"
                    value={message} // Liaison du state au textarea
                    onChange={(e) => setMessage(e.target.value)} // Mise à jour du state lors de la saisie
                  ></textarea>
                </label>
                <PostulerDialog
                  className="text-black"
                  onConfirm={handlePostuler}
                />


            {/* Ajouter le composant DialogSignalerAbus ici */}
            <div className="mt-6">
            <ReportAbuseDialog service_id={jobId} className="mt-5" />

            </div>
              </form>

            ) : (
              <div className="mt-5">
                <AlertCompleted />
              </div>
            )}

            
          </div>

          <div className="w-full h-full md:mt-2">
            <div
              className="lg:block w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  image ? `${imagePath}/${image}` : images.person
                }')`,
              }}
            >
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailServices;
