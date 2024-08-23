import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { AlertCompleted } from "./AlertCompleted";
import { UserContext } from "@/contexts/ContextProvider";
import search from "../assets/search.png";
import LoadingSpinner from "./Loading";

const CenteredServicesMaterial = () => {
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

  const materialServices = Array.isArray(services)
    ? services.filter((service) => service.service_type === "material")
    : [];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = materialServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-5 w-full flex justify-center items-center flex-col">
      {isLoggedIn && <AlertCompleted />}
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Matériaux Agricoles
      </h2>
      {currentPosts.length === 0 ? (
        <div className="flex flex-col items-center bg-orange-50 p-6 rounded-lg shadow-lg">
          <img
            src={search}
            alt="Recherche"
            className="mb-4 w-24 h-24 object-contain"
          />
          <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Aucun matériel disponible pour le moment.
          </p>
        </div>
      ) : (
        <div
          className="grid place-items-center" >
                  <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 md:gap-20 gap-2 w-3/4">
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
        </div>
      )}
      {materialServices.length > postsPerPage && (
        <Pagination
          totalPosts={materialServices.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default CenteredServicesMaterial;
