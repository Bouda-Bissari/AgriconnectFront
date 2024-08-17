import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonJobCard from "./Skeleton"; // Import the Skeleton component
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import { AlertCompleted } from "./AlertCompleted";
import { UserContext } from "@/contexts/ContextProvider";

const ServicesWork = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const {  token } = UserContext();
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get("/services");
        setServices(response.data);
        console.log(response.data);
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
      <div className="my-20 w-full flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Nos dernieres offres
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 md:gap-20 gap-2 w-3/4">
          {Array.from({ length: postsPerPage }).map((_, index) => (
            <SkeletonJobCard key={index} />
          ))}
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
    <div className="my-20 w-full flex justify-center items-center flex-col">
      {isLoggedIn && <AlertCompleted />}
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Nos dernieres offres
      </h2>
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
      <Pagination
        totalPosts={workServices.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ServicesWork;
