import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonJobCard from "./Skeleton";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

const UserServices = () => {
  const { userId } = useParams();
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
    // Chargement du skeleton
    return (
      <div className="my-20 w-full flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Vos Offres misent en ligne
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xs:grid-cols-2 md:gap-20 gap-20 ">
          {Array.from({ length: postsPerPage }).map((_, index) => (
            <SkeletonJobCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="mt-40">Error: {error.message}</p>;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = services.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 w-full flex justify-center items-center flex-col">
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Vos Offres
      </h2>
      <div className="flex justify-center mt-8">
        <a
          href="/createservice"
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
          Poster une offre
        </a>
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col bg-blue-950 p-10 rounded-xl items-center">
          <p className="text-lg font-semibold text-white  mb-4">
            Vous n&apos;avez encore posté aucune Offre de main d&apos;œuvre.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xs:grid-cols-2 md:gap-20 gap-20 ">
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
