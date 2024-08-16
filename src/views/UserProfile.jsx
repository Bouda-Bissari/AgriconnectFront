import { useState, useEffect } from "react";
import axios from "../configs/axiosClient.js";
import ProfilCard from "../components/ProfilCard";
import Pagination from "../components/Pagination";
import SkeletonProfileCard from "../components/SkeletonProfileCard.jsx";
import images from "../assets/index.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = UserContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profile");
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);
  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    if (loading) {
      return (
        <div className="w-full bg-gray-800">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
            style={{ fontFamily: "poetsen" }}
          >
            Chargement des profils...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto m-20">
            {Array.from({ length: postsPerPage }).map((_, index) => (
              <SkeletonProfileCard key={index} />
            ))}
          </div>
        </div>
      );
    }

    if (error) return <p className="mt-40">Erreur: {error.message}</p>;

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentProfiles = profiles.slice(firstPostIndex, lastPostIndex);

    return (
      <main className="  bg-gray-200 flex flex-col p-10 ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto m-20">
          {currentProfiles.map((profile) => (
            <ProfilCard
              key={profile.id}
              profilId={profile.id}
              fullName={profile.fullName}
              email={profile.details?.email || "Non disponible"}
              phone_number={profile.phone_number}
              date={profile.details?.date || "Non disponible"}
              gender={profile.details?.gender || "Non disponible"}
              avatar_url={profile.details?.avatar_url || images.person}
              bio={profile.details?.bio || "Non disponible"}
              company_name={profile.details?.company_name || "Non disponible"}
              address={profile.details?.address || "Non disponible"}
              domaine={profile.details?.domaine || "Non disponible"}
            />
          ))}
        </div>

        <Pagination
          totalPosts={profiles.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    );
  }
};

export default UserProfile;
