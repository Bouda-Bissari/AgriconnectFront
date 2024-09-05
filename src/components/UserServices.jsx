/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import JobCard from "./JobCard";
// import SkeletonJobCard from "./Skeleton";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import search from "../assets/search.png";
import Loading from "./Loading";
import { UserContext } from "@/contexts/ContextProvider";
import ActionAlert from "./ActionAlert";

const UserServices = () => {
  const { userId1 } = useParams();
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const navigate = useNavigate();
  const {isCompleted} = UserContext();
  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        const response = await axiosClient.get(`${userId}/services`);
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserServices();
  }, [userId]);

  const onLogin = () => {
    navigate(`/profil/${userId}`);
  };

  if (error) {
    return <p className="mt-20 text-red-600">Erreur : {error.message}</p>;
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = services.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2
        className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2 mt-4"
        style={{ fontFamily: "poetsen" }}
      >
        Vos publications
      </h2>
      <div className="flex justify-center my-6">
        {isCompleted? (
          <Link
          to="/profil/createservice"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
        >
          Publier un Besoin
        </Link>
        ):(
<ActionAlert onLogin={onLogin} />
        )}
        
      </div>

      {loading ? (
        <Loading />
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-lg">
          <img
            src={search}
            alt="Recherche"
            className="mb-4 w-24 h-24 object-contain"
          />
          <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Vous n&apos;avez encore aucune publication de besoins de main
            d&apos;œuvre.
          </p>
        </div>
      ) : (
        <div className="grid place-items-center w-full ml-80">
          <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 gap-5">
            {currentPosts.map((service) => (
              <JobCard
                key={service.id}
                type={service.service_type}
                location={service.location}
                title={service.title}
                deadline={service.deadline}
                jobId={service.id}
                price={service.price}
                imageUrl={service.image}
                userId={service.user_id}
              />
            ))}
          </div>
        </div>
      )}
{services.length != 0 ? (
        <Pagination
        totalPosts={services.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
):null}

    </div>
  );
};

export default UserServices;
