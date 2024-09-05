import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import axiosClient from "../configs/axiosClient";
import Pagination from "./Pagination";
import Loading from "./Loading";

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
    const filtered = services.filter((service) => {
      const matchesQuery = service.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All categories" ||
        service.service_type === selectedCategory;
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
          className="text-3xl md:mt-10 mt-5 font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Services
        </h2>
        <div className="grid place-items-center">
          <Loading />
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
        className="text-3xl md:mt-10 mt-5  font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Services
      </h2>

      {/* Search and filter section */}
      <div className="max-w-lg mx-auto mb-6">
        <form className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher par titre"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full md:w-1/3">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            >
              <option value="All categories">Tout</option>
              <option value="work">Demande de main d&apos;oeuvre</option>
              <option value="material">Materiel</option>
              {/* Add other categories as needed */}
            </select>
          </div>
        </form>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl font-bold text-gray-700">
            Aucune publication disponible pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-2 gap-2 ">
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

export default Services;
