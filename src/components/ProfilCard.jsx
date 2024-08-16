/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import images from "../assets/index.jsx";

const ProfilCard = ({
  phone_number,
  fullName,
  profilId,
  email,
  date,
  gender,
  avatar_url,
  bio,
  company_name,
  address,
  domaine,
}) => {
  return (
    <div className="w-full bg-gray-900 rounded-lg shadow-lg p-2 flex flex-col justify-center items-center">
      <div className="mb-2">
        <img
          src={avatar_url || images.person}
          alt="User Avatar"
          className="object-center object-cover rounded-full h-36 w-36"
        />
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
      <Link to={`/detailprofil/${profilId}`}>
        <button className="w-full py-2 px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out">
          Voir les détails
        </button>
      </Link>
    </div>
  );
};

export default ProfilCard;
