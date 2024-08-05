import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axiosClient from "../axiosClient";
import Pagination from "./Pagination";

const ServicesMaterial = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

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

  if (loading) return <p className="mt-40">Loading...</p>;
  if (error) return <p className="mt-40">Error: {error.message}</p>;

  // Filter only "work" services
  const workServices = services.filter(
    (service) => service.service_type === "material"
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = workServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 flex justify-center items-center flex-col">
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Services
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 w-3/4">
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
      <Pagination
        totalPosts={workServices.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ServicesMaterial;
