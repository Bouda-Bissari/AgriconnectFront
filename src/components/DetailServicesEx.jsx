/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import images from "../assets/index.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl.js";
import { PostulerDialog } from "@/components/PostulerDialog.jsx";
import { ReportAbuseDialog } from "@/components/ReportAbuseDialog.jsx";
import Loading from "./Loading.jsx";
import { Button } from "./ui/button.jsx";

// Fonction pour formater les prix en FCFA sans décimales
const formatPrice = (price) => {
  if (price === undefined || price === null) return "Prix non spécifié";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const DetailServicesEx = () => {
  const navigate = useNavigate();
  const { jobId, Id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { user, token } = UserContext();
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  const userIdNumber =
    typeof userId === "string" ? parseInt(userId, 10) : userId;
  const IdNumber = typeof Id === "string" ? parseInt(Id, 10) : parseFloat(Id);

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
        navigate(`/profil/user/candidature`);
      })
      .catch((error) => {
        alert("Erreur lors de la création de la candidature: " + error.message);
      });
  };

  const handleDeleteService = () => {
    axios
      .patch(`/service/${jobId}/update-deleted-status`, {
        deleted: true,
      })
      .then((response) => {
        alert("Service supprimé avec succès");
        navigate(`/profil/user/${user.id}/services`);
      })
      .catch((error) => {
        alert("Erreur lors de la suppression du service: " + error.message);
      });
  };

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return (
      <div className="grid place-items-center h-screen w-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!serviceData) {
    return <p className="text-gray-500">Pas de services disponibles</p>;
  }

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

  const { title, description, location, image, price } = serviceData.service;
  const { phone_number } = serviceData.service.user || {};
  const formattedPhoneNumber = formatPhoneNumber(phone_number);

  const { email } = serviceData.profiles || {};

  return (
    <div className="grid place-items-center my-28">
      <section className="mx-auto p-4 w-full  max-w-3xl bg-green-900 text-white dark:bg-orange-900 dark:text-white rounded-lg">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <h1
              className="md:text-5xl text-center mb-4"
              style={{ fontFamily: "raleway" }}
            >
              {title}
            </h1>
            <p className="text-center text-xl mb-4">{description}</p>
            <div className="space-y-4">
              <p className="flex items-center" style={{ fontFamily: "raleway" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 mr-2 sm:mr-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="md:text-4xl font-light">{location}</span>
              </p>
              <p className="flex items-center" style={{ fontFamily: "raleway" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 mr-2 sm:mr-4"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span className=" md:text-4xl">{formattedPhoneNumber}</span>
              </p>
              {email && (
                <p className="flex items-center" style={{ fontFamily: "raleway" }}>

                  <span className="md:text-2xl flex items-center">
                    
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 sm:mr-4"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="style=linear">
                        {" "}
                        <g id="email">
                          {" "}
                          <path
                            id="vector"
                            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            id="vector_2"
                            d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                    {email}
                    
                  </span>
                </p>
              )}
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="md:text-4xl" style={{ fontFamily: "raleway" }}>
                  {formatPrice(price)}
                </span>
              </p>
            </div>

            {userIdNumber != IdNumber && IdNumber ? (
              user.is_completed ? (
                <form noValidate className="flex flex-col space-y-6 mt-3">
                  <label className="block">
                    <span className="mb-1">Message</span>
                    <textarea
                      rows="3"
                      className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-green-600 dark:bg-gray-100 text-black"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </label>
                  <PostulerDialog
                    className="text-black"
                    onConfirm={handlePostuler}
                  />
                </form>
              ) : // <div className="mt-5">
              //   <AlertCompleted />
              // </div>
              null
            ) : null}

            {userIdNumber === IdNumber && IdNumber ? (
              <div className="flex space-x-4 mt-4">
                <Button
                  onClick={handleDeleteService}
                  style={{ fontFamily: "raleway" }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 md:text-2xl "
                >
                  Supprimer
                </Button>
                <Link
                  to={`/profil/updateservice/${jobId}`}
                  style={{ fontFamily: "raleway" }}
                  className="px-4 py-1 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700 transition duration-300 md:text-2xl"
                >
                  Modifier
                </Link>
              </div>
            ) : null}
          </div>

          <div className="relative h-full">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  image ? `${imagePath}/${image}` : images.person
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailServicesEx;
