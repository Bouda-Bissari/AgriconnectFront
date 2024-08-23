import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import search from "../assets/searching.png";
import Loading from "./Loading";

const ServicesMaterial = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

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
    // Show Skeletons during loading
    return (
      <div className="my-20 flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-orange-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
        Publications Agricoles{" "}
        </h2>
        <div className="">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) return <p className="mt-40">Error: {error.message}</p>;

  // Filter only "material" services and match search term
  const filteredServices = services.filter(
    (service) =>
      service.service_type === "material" &&
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 flex justify-center items-center flex-col">
      <h2
        className="text-3xl mt-10 font-bold text-gray-900 mb-6 border-b-2 border-orange-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Publications Agricoles{" "}
      </h2>

      {/* Search Bar */}

      {filteredServices > 0 && (
        <div className="mb-8 w-3/4 relative">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute left-3 top-3 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Recherchez un matériel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
      )}

      {currentPosts.length === 0 ? (
        <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-lg">
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
      {/* Only show Pagination if the total number of services is greater than postsPerPage */}
      {filteredServices.length > postsPerPage && (
        <Pagination
          totalPosts={filteredServices.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ServicesMaterial;
