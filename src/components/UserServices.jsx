import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonJobCard from "./Skeleton";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { Link, useParams } from "react-router-dom";
import search from "../assets/search.png";
import Loading from "./Loading";

const UserServices = () => {
  const { userId1 } = useParams();
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center my-20 w-full">
        <h2
          className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Vos publications
        </h2>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p className="mt-20 text-red-600">Erreur : {error.message}</p>;
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = services.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col items-center justify-center my-20 p-4 w-full">
      <h2
        className="md:text-3xl text-xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Vos Publications de Besoins de Main d&apos;Œuvre
      </h2>
      <div className="flex justify-center my-6">
        <Link
          to="/profil/createservice"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
        >
          Publier un Besoin
        </Link>
      </div>

      {services.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full pl-10">
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
      )}

      <Pagination
        totalPosts={services.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UserServices;
