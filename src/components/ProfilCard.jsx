/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import images from "../assets/index.jsx";
import imagePath from "../configs/imageUrl";

const ProfilCard = ({
  phone_number,
  fullName,
  profilId,
  email,
  date,
  gender,
  image,
  bio,
  company_name,
  address,
  domaine,
}) => {
  return (
    <div className="w-full bg-gray-900 rounded-lg shadow-lg p-2 flex flex-col justify-center items-center">
      <div className="mb-2">
        {image ? (
          <img
            src={`${imagePath}/${image}`}
            alt="Profile Image"
            className="object-center object-cover rounded-full h-36 w-36"
          />
        ) : (
          // <img
          //   className="object-center object-cover rounded-full h-36 w-36"
          //   src={images.person}
          //   alt="Avatar avec bordure"
          // />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="object-center object-cover rounded-full h-36 w-36"

          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="style=fill">
                {" "}
                <g id="profile">
                  {" "}
                  <path
                    id="vector (Stroke)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                    fill="#ffffff"
                  ></path>{" "}
                  <path
                    id="rec (Stroke)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        )}
      </div>
      <div className="text-center mb-4">
        <p className="text-xl text-white font-bold mb-2">
          {fullName || "Nom complet: N/A"}
        </p>
        <p className="text-base text-gray-400 font-normal">
          {domaine || "Domaine: N/A"}
        </p>
      </div>
      {/* View Details Button */}
      <Link to={`/ouvriers/detailprofil/${profilId}`}>
        <button className="w-full py-2 px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out">
          Voir le profil
        </button>
      </Link>
    </div>
  );
};

export default ProfilCard;
