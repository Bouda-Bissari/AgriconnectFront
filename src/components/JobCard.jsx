/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import imagePath from "../configs/imageUrl";
import axiosClient from "@/configs/axiosClient";
import { useEffect, useState } from "react";
import images from "../assets/index";
import { UserContext } from "@/contexts/ContextProvider";
import { LoginPromptDialog } from "./LoginPromptDialog";
const formatPrice = (price) => {
  if (price === undefined || price === null) return "Prix non spécifié";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF", // Utilise le code pour le FCFA
    minimumFractionDigits: 0, // Pas de décimales
    maximumFractionDigits: 0,
  }).format(price);
};

const JobCard = ({
  type,
  location,
  title,
  deadline,
  jobId,
  price,
  imageUrl,
  userId,
}) => {
  const [numberOfApplications, setNumberOfApplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = UserContext();

  const Id = JSON.parse(localStorage.getItem("USER_ID"));
  // console.log(Id);
  // console.log(userId);

  // useEffect(() => {
  //   const fetchApplicationsCount = async () => {
  //     try {
  //       const response = await axiosClient.get(
  //         `/services/${jobId}/count-applications`
  //       );
  //       setNumberOfApplications(response.data.applications_count);
  //     } catch (error) {
  //       setError("Failed to fetch applications count");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchApplicationsCount();
  // },[]);

  // useEffect(() => {
  //   console.log("Fetching applications count for jobId:", jobId);
  //   const fetchApplicationsCount = async () => {
  //     try {
  //       const response = await axiosClient.get(
  //         `/services/${jobId}/count-applications`
  //       );
  //       setNumberOfApplications(response.data.applications_count);
  //     } catch (error) {
  //       setError("Failed to fetch applications count");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (jobId) {
  //     fetchApplicationsCount();
  //   }
  // }, [jobId]);



  useEffect(() => {
    if (userId === Id && Id !== null && userId !== undefined) {
      console.log("Fetching applications count for jobId:", jobId);
      const fetchApplicationsCount = async () => {
        try {
          const response = await axiosClient.get(
            `/services/${jobId}/count-applications`
          );
          setNumberOfApplications(response.data.applications_count);
        } catch (error) {
          setError("Failed to fetch applications count");
        } finally {
          setLoading(false);
        }
      };

      fetchApplicationsCount();
    } else {
      setLoading(false);
    }
  }, [jobId, userId, Id]);

  const onLogin = () => {
    navigate("/login");
  };
  return (
    <div className="mx-auto mt-2 md:w-60 bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        {imageUrl ? (
          <div>
            <img
              src={`${imagePath}/${imageUrl}`}
              alt={title}
              className="w-full md:h-56 h-32 object-cover"
            />
            {userId === Id &&
              Id !== null &&
              userId !== undefined &&
              numberOfApplications > 0 && (
                <Link
                  to={`/profil/user/${jobId}/candidatures`}
                  className="absolute top-2 right-2 cursor-pointer z-10 flex items-center p-2 bg-white rounded-full shadow-md hover:bg-gray-100 border border-gray-300 transition-all"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                    className="z-10 transition-colors duration-200 hover:fill-black hover:stroke-white"
                  >
                    <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                  <span className="absolute -top-5 right-20 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {numberOfApplications}
                  </span>
                  <span className="text-xs text-black ml-2 font-semibold">
                    Voir candidatures
                  </span>
                </Link>
              )}
          </div>
        ) : (
          <div
            className={`h-56 bg-${
              type === "work" ? "green" : "blue"
            }-600 flex items-center justify-center`}
          >
            <img src={images.logo} alt="cash" />
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-end justify-center p-4 ${
            type === "work" ? "bg-green-600" : "bg-blue-600"
          } bg-opacity-50`}
        >
          <div className="text-center">
            <p className="text-lg font-bold text-white">{title}</p>
            <p className="text-sm text-white">{location}</p>
            <div className="mt-2">
              <span className="border rounded-full py-1 px-3 text-xs font-semibold text-white bg-gray-600">
                {type === "work" ? "Service de travail" : "Matériel"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 space-y-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-800">
            Date limite : {deadline || "Non spécifiée"}
          </p>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-800">
            Prix : {formatPrice(price)}
          </p>
        </div>
        {userId === Id && Id !== null && userId !== undefined ? (
          <Link to={`/profil/servicedetail/${jobId}/${Id}`}>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Voir les détails
            </button>
          </Link>
        ) : token ? (
          <Link to={`/services/detailservice/${jobId}`}>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Voir les détails
            </button>
          </Link>
        ) : (
          <LoginPromptDialog onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default JobCard;
