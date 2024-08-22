import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonJobCard from "./Skeleton"; // Import the Skeleton component
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { AlertCompleted } from "./AlertCompleted";
import { UserContext } from "@/contexts/ContextProvider";
import search from "../assets/search.png";
import LoadingSpinner from "./Loading";

const CenteredServicesWork = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { token } = UserContext();
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get("/services");
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="md:my-5 w-full flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Nos dernières offres
        </h2>
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) return <p className="mt-40">Error: {error.message}</p>;

  const workServices = Array.isArray(services)
    ? services.filter((service) => service.service_type === "work")
    : [];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = workServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-5 w-full flex justify-center items-center flex-col">
      {isLoggedIn && <AlertCompleted />}
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Recherches de main-d&apos;œuvre agricole
      </h2>
      {currentPosts.length === 0 ? (
        <div className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-lg">
          <img
            src={search}
            alt="Recherche"
            className="mb-4 w-24 h-24 object-contain"
          />
          <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Aucun besoin de main d&apos;œuvre disponible pour le moment.
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-wrap justify-around gap-4 ${
            currentPosts.length === 1
              ? "w-1/5"
              : currentPosts.length === 2
              ? "w-2/8"
              : currentPosts.length === 3
              ? "w-3/5"
              : currentPosts.length === 4
              ? "w-4/5"
              : "w-full"
          }`}
        >
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
      {workServices.length > postsPerPage && (
        <Pagination
          totalPosts={workServices.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default CenteredServicesWork;
