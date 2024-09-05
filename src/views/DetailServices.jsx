import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import images from "../assets/index.jsx";
import SkeletonDetailService from "../components/SkeletonDetailService.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl.js";
import { PostulerDialog } from "@/components/PostulerDialog.jsx";
// import { AlertCompleted } from "@/components/AlertCompleted.jsx";
import { ReportAbuseDialog } from "@/components/ReportAbuseDialog.jsx"; // Importer le composant
import { Button } from "@/components/ui/button.jsx";

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
  const { user, token,setRoles } = UserContext();


  const userId = JSON.parse(localStorage.getItem("USER_ID"));

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
        setRoles(response.data.role); 
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
  const { title, description, location, image, price, service_type } =
    serviceData.service;
  const { phone_number, id, fullName } = serviceData.service.user || {};
  const { email } = serviceData.profiles || {};


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

  const handleDeleteService = () => {
    axios
      .patch(`/service/${jobId}/update-deleted-status`, {
        deleted: true,
      })
      // eslint-disable-next-line no-unused-vars
      .then((_) => {
        alert("Service supprimé avec succès");
        // Redirection ou autre action après la suppression
        navigate(`/profil/user/${user.id}/services`);
      })
      .catch((error) => {
        alert("Erreur lors de la suppression du service: " + error.message);
      });
  };

    // Gestion de la redirection vers le profil
    const handleRedirect = () => {
      navigate(`/profil/${userId}`);
    };
  

  return (
    <div className="my-40">
      <section className="container mx-auto w-4/5 rounded-sm py-6 bg-green-900 text-white dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6 relative">
            <div className="">
              <ReportAbuseDialog service_id={jobId} className="mt-5" />
            </div>
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
                <span className="font-bold">{formatPhoneNumber(phone_number)}</span>
              </p>
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="font-bold">{fullName}</span>
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
              service_type === "material" ? (
                <div className="flex flex-col gap-2 justify-center items-center mt-4 ">
                  <Button
                    onClick={() =>
                      window.open(`https://wa.me/${phone_number}`, "_blank")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex gap-1"
                  >
                                    <svg
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="#ffffff"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>whatsapp [#128]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-300.000000, -7599.000000)"
                        fill="#ffffff"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M259.821,7453.12124 C259.58,7453.80344 258.622,7454.36761 257.858,7454.53266 C257.335,7454.64369 256.653,7454.73172 254.355,7453.77943 C251.774,7452.71011 248.19,7448.90097 248.19,7446.36621 C248.19,7445.07582 248.934,7443.57337 250.235,7443.57337 C250.861,7443.57337 250.999,7443.58538 251.205,7444.07952 C251.446,7444.6617 252.034,7446.09613 252.104,7446.24317 C252.393,7446.84635 251.81,7447.19946 251.387,7447.72462 C251.252,7447.88266 251.099,7448.05372 251.27,7448.3478 C251.44,7448.63589 252.028,7449.59418 252.892,7450.36341 C254.008,7451.35771 254.913,7451.6748 255.237,7451.80984 C255.478,7451.90987 255.766,7451.88687 255.942,7451.69881 C256.165,7451.45774 256.442,7451.05762 256.724,7450.6635 C256.923,7450.38141 257.176,7450.3464 257.441,7450.44643 C257.62,7450.50845 259.895,7451.56477 259.991,7451.73382 C260.062,7451.85686 260.062,7452.43903 259.821,7453.12124 M254.002,7439 L253.997,7439 L253.997,7439 C248.484,7439 244,7443.48535 244,7449 C244,7451.18666 244.705,7453.21526 245.904,7454.86076 L244.658,7458.57687 L248.501,7457.3485 C250.082,7458.39482 251.969,7459 254.002,7459 C259.515,7459 264,7454.51465 264,7449 C264,7443.48535 259.515,7439 254.002,7439"
                            id="whatsapp-[#128]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>


                    Contacter par WhatsApp
                  </Button>
                  <Button
                    onClick={() => (window.location.href = `mailto:${email}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Contacter par Email
                  </Button>
                </div>
              ) : (
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
                </form>
              )
            ) : (
              <div className="mt-5">
                Veuillez completer Votrer Profil ,Pour pouvoir postuler
                <Button
                  onClick={handleRedirect}
                  className="bg-yellow-500 text-white font-bold hover:bg-yellow-800 mt-2"
                >
                  Compléter le Profil
                </Button>
              </div>
            )}

            {id === user.id && (
              <Button
                onClick={handleDeleteService}
                className="mt-4 px-4 py-2 w-full mx-auto bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </Button>
            )}
          </div>

          <div className="w-full h-full md:mt-2">
            <div
              className="lg:block w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  image ? `${imagePath}/${image}` : images.Farmer
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
