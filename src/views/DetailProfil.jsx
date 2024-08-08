import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import { person } from "../assets/index.js";
import SkeletonDetailService from "../components/SkeletonDetailService.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";

const DetailProfil = () => {
  const { profilId } = useParams();
  const [profilData, setProfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = UserContext();

  useEffect(() => {
    axios
      .get(`profile/${profilId}`)
      .then((response) => {
        setProfilData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [profilId]);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <SkeletonDetailService />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profilData) {
    return <p>Pas de profil disponible</p>;
  }

  // Assurez-vous que details est défini
  const details = profilData.details || {};

  // Extraction des données
  const { fullName, phone_number, domaine } = profilData;

  const {
    email = null,
    age,
    gender,
    avatar_url,
    bio,
    company_name,
    address,
  } = details;

  return (
    <div className="my-40">
      <section className="container mx-auto rounded-sm py-6 dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <div className="flex flex-col items-center mb-4">
              <img
                src={avatar_url || person}
                
                alt="User Avatar"
                className="object-center object-cover rounded-full h-36 w-36 mb-4"
              />
              <h1
                className="text-4xl text-center"
                style={{ fontFamily: "poetsen" }}
              >
                {fullName}
              </h1>
              <p className="text-base text-center">
                {domaine || "Domaine non spécifié"}
              </p>
            </div>
            <div className="space-y-4">
              {phone_number && (
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
              )}
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
              {gender && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 9a1 1 0 110-2 1 1 0 010 2zm1 3a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                  <span className="font-bold">{gender}</span>
                </p>
              )}
              {age && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M9.293 4.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414-1.414l4-4z"></path>
                  </svg>
                  <span className="font-bold">{age} ans</span>
                </p>
              )}
              {bio && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <span className="font-bold">{bio}</span>
                </p>
              )}
              {company_name && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M4 4a1 1 0 011-1h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                  </svg>
                  <span className="font-bold">{company_name}</span>
                </p>
              )}
              {address && (
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
                  <span className="font-bold">{address}</span>
                </p>
              )}
            </div>
          </div>

          <div className="p-5">
            <img
              src={avatar_url || person}
              alt="User Avatar"
              className="object-center object-cover rounded w-full mb-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailProfil;
