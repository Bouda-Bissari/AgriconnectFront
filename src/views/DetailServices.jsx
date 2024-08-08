import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import { person } from "../assets/index.js";
import SkeletonDetailService from "../components/SkeletonDetailService.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl.js";

const DetailServices = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = UserContext();

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
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  if (loading) {
    if (loading) {
      return <SkeletonDetailService />;
    }
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!serviceData) {
    return <p>Pas de serices disponibles</p>;
  }

  // Destructure the data for easier access
  const { title, description, location, image, price } = serviceData.service;
  const { phone_number } = serviceData.service.user || {};
  const { email } = serviceData.profiles || {};

  return (
    <div className="my-40">
      <section className="container mx-auto rounded-sm py-6 dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl " style={{ fontFamily: "poetsen" }}>
              {title}
            </h1>
            <p className="pt-2 pb-4">{description}</p>
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
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 6.586l4.293-4.293a1 1 0 111.414 1.414L11 8.414l4.293 4.293a1 1 0 01-1.414 1.414L10 9.828l-4.293 4.293a1 1 0 01-1.414-1.414L9.828 10l-4.293-4.293a1 1 0 010-1.414z"></path>
                </svg>
                <span className="font-bold">{price} FCFA</span>
              </p>
            </div>
            <form
            noValidate=""
            className="flex flex-col py-6 space-y-6 mt-3 md:py-0 md:px-6"
          >
           
            
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows="3"
                className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-green-600 dark:bg-gray-100 text-black"
              ></textarea>
            </label>
            <button
              type="button"
              onClick={() => {}}
              className="self-center font-bold px-5 py-2 w-full text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-green-600 dark:text-gray-50 focus:dark:ring-green-600 hover:dark:ring-green-600"
            >
              Postuler
            </button>
          </form>

          </div>
 


          <div className="w-full h-full md:mt-2">
              <div
                className="lg:block w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('${imagePath}/${image || 'person'}')`,
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
