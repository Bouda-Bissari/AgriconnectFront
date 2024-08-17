import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import SkeletonJobCard from "./Skeleton"; // Import the Skeleton component
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [selectedCategory, setSelectedCategory] = useState("All categories"); // New state for selected category

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get("/services");
        setServices(response.data);
        setFilteredServices(response.data); // Initialize filtered services
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on search query and selected category
    const filtered = services.filter(service => {
      const matchesQuery = service.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All categories" || service.service_type === selectedCategory;
      return matchesQuery && matchesCategory;
    });
    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, services]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    // Show Skeletons during loading
    return (
      <div className="my-20 flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-20 gap-2 w-3/4">
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
  const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 flex justify-center items-center flex-col">
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Services
      </h2>
      
      {/* Search and filter section */}
      <div className="mb-6 w-3/4 flex flex-col md:flex-row items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher par titre"
          className="p-2 border border-gray-300 rounded mr-4 w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/4"
        >
          <option value="All categories">All categories</option>
          <option value="work">Work</option>
          <option value="material">Material</option>
          {/* Add other categories as needed */}
        </select>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-20 gap-2 w-3/4">
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
        totalPosts={filteredServices.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Services;
