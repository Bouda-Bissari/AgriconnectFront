import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "../configs/axiosClient.js";
import images from "../assets/index.jsx";
import SkeletonDetailService from "../components/SkeletonDetailService.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl";

const DetailProfil = () => {
  const { profilId } = useParams();
  const [profilData, setProfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = UserContext();

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
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



  useEffect(() => {
    axios
      .get(`profile/${profilId}`)
      .then((response) => {
        if (response.data.details && response.data.details.date) {
          response.data.details.age = calculateAge(response.data.details.date);
        }
        setProfilData(response.data);
        setLoading(false);
        // console.log(response.data.details);
        // console.log(profilData.details.domaine);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [profilId]);

  console.log(profilData);
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <SkeletonDetailService />;
  }

  if (error) {
    return <p className="m-40">Error: {error}</p>;
  }

  if (!profilData) {
    return <p>Pas de profil disponible</p>;
  }

  const { fullName, phone_number } = profilData;
  const {
    email = null,
    age,
    gender,
    image,
    bio,
    company_name,
    domaine,
    address,
  } = profilData.details || {};

  return (
    <div className="my-40">
      <section className="container w-4/5 mx-auto rounded-sm py-6 px-5 bg-orange-900 text-white dark:bg-orange-900 dark:text-white">
        <div className="grid max-w-6xl grid-cols-1 px-5 mx-auto lg:px-0 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-0">
            <div className="flex flex-col items-center mb-4">
              {image ? (
                <img
                  src={`${imagePath}/${image}`}
                  alt="Profile Image"
                  className="object-center object-cover rounded-full h-36 w-36"
                />
              ) : (
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={images.person}
                  alt="Avatar avec bordure"
                />
              )}
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
                  <span className="font-bold text-xl">{formatPhoneNumber(phone_number)}</span>
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
                  <span className="font-bold text-xl">{email}</span>
                </p>
              )}
              {gender && (
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="font-bold w-5 h-5 mr-2 sm:mr-6"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
                    />
                  </svg>
                  <span className="font-bold text-xl">{gender}</span>
                </p>
              )}
              {age && (
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

                  <span className="font-bold text-xl">{age} ans</span>
                </p>
              )}
              {bio && (
                <p className="flex items-center">
                  <svg
                    viewBox="0 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>message_three_points [#1560]</title>{" "}
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
                          transform="translate(-420.000000, -959.000000)"
                          fill="#ffffff"
                        >
                          {" "}
                          <g
                            id="icons"
                            transform="translate(56.000000, 160.000000)"
                          >
                            {" "}
                            <path
                              d="M380.872728,808.94 C380.872728,810.045 379.977728,810.94 378.872728,810.94 C377.767728,810.94 376.872728,810.045 376.872728,808.94 C376.872728,807.835 377.767728,806.94 378.872728,806.94 C379.977728,806.94 380.872728,807.835 380.872728,808.94 M375.872728,808.94 C375.872728,810.045 374.977728,810.94 373.872728,810.94 C372.767728,810.94 371.872728,810.045 371.872728,808.94 C371.872728,807.835 372.767728,806.94 373.872728,806.94 C374.977728,806.94 375.872728,807.835 375.872728,808.94 M370.872728,808.94 C370.872728,810.045 369.977728,810.94 368.872728,810.94 C367.767728,810.94 366.872728,810.045 366.872728,808.94 C366.872728,807.835 367.767728,806.94 368.872728,806.94 C369.977728,806.94 370.872728,807.835 370.872728,808.94 M381.441728,817 C381.441728,817 378.825728,816.257 377.018728,816.257 C375.544728,816.257 375.208728,816.518 373.957728,816.518 C369.877728,816.518 366.581728,813.508 366.075728,809.851 C365.403728,804.997 369.268728,800.999 373.957728,801 C377.900728,801 381.002728,803.703 381.732728,807.083 C382.000728,808.318 381.973728,809.544 381.654728,810.726 C381.274728,812.131 381.291728,813.711 381.703728,815.294 C381.914728,816.103 382.302728,817 381.441728,817 M383.917728,815.859 C383.917728,815.859 383.640728,814.794 383.639728,814.79 C383.336728,813.63 383.271728,812.405 383.584728,811.248 C383.970728,809.822 384.035728,808.268 383.687728,806.66 C382.767728,802.405 378.861728,799 373.957728,799 C367.999728,798.999 363.264728,804.127 364.094728,810.125 C364.736728,814.766 368.870728,818.518 373.957728,818.518 C375.426728,818.518 375.722728,818.257 377.019728,818.257 C378.583728,818.257 380.795728,818.919 380.795728,818.919 C382.683728,819.392 384.399728,817.71 383.917728,815.859"
                              id="message_three_points-[#1560]"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>

                  <span className="font-bold text-xl">{bio}</span>
                </p>
              )}
              {company_name && (
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
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>

                  <span className="font-bold text-xl">{company_name}</span>
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
                  <span className="font-bold text-xl">{address}</span>
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-around gap-5">
              <a
                href={`https://wa.me/${phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded-md font-bold flex gap-1"
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
                Contact via WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md font-bold"
              >
                Contact via Email
              </a>
            </div>
          </div>
          <div className="pt-6 md:pt-0 md:px-6">
            {image ? (
              <img
                src={`${imagePath}/${image}`}
                alt="Profile Image"
                className="object-center object-cover rounded w-full h-full"
              />
            ) : (
              <img
                className="object-center object-cover rounded w-full h-full"
                src={images.person}
                alt="Avatar avec bordure"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailProfil;
