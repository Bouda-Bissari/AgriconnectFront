import { useState, useEffect } from "react";
import axios from "../configs/axiosClient.js";
import ProfilCard from "../components/ProfilCard";
import Pagination from "../components/Pagination";
import images from "../assets/index.jsx";
import { UserContext } from "../contexts/ContextProvider.jsx";
import { Navigate } from "react-router-dom";
import Loading from "@/components/Loading.jsx";

const categories = [
  "Culture de céréales",
  "Culture de légumes",
  "Culture de fruits",
  "Culture de tubercules",
  "Élevage de bétail",
  "Élevage de volailles",
  "Aquaculture",
  "Jardinage",
  "Sarclage",
  "Arboriculture",
  "Horticulture",
  "Viticulture",
  "Culture de plantes médicinales",
  "Cultures sous serre",
  "Agroforesterie",
  "Culture bio",
  "Recrutement de travailleurs agricoles",
  "Gestion des fermes",
  "Consultation en agriculture",
  "Vente de produits agricoles",
  "Formation agricole",
];

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const { token } = UserContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profile");
        // Filtrer les profils pour le rôle "ouvrier"
        const profilesWithRoleOuvrier = response.data.filter(
          (profile) =>
            profile.roles.some((role) => role.name === "ouvrier") &&
            profile.is_completed
        );
        setProfiles(profilesWithRoleOuvrier);
        setFilteredProfiles(profilesWithRoleOuvrier);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const filtered = profiles.filter((profile) => {
      const matchesQuery = profile.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All categories" ||
        (profile.details && profile.details.domaine === selectedCategory);
      return matchesQuery && matchesCategory;
    });

    setFilteredProfiles(filtered);
  }, [searchQuery, selectedCategory, profiles]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    if (loading) {
      // Show Skeletons during loading
      return (
        <div className="my-20 flex justify-center items-center flex-col">
          <h2
            className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-orange-600 pb-2"
            style={{ fontFamily: "poetsen" }}
          >
            Ouvriers{" "}
          </h2>
          <div className="">
            <Loading />
          </div>
        </div>
      );
    }

    if (error) return <p className="mt-40">Erreur: {error.message}</p>;

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentProfiles = filteredProfiles.slice(
      firstPostIndex,
      lastPostIndex
    );

    return (
      <main className="bg-white md:mt-20 mt-5 flex flex-col items-center justify-center p-10">
        <div className="mb-6 w-full max-w-screen-md mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Rechercher par nom..."
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="relative w-full md:w-1/4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="All categories">Toutes les catégories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 mx-auto ">
          {currentProfiles.length === 0 ? (
            <p>Aucun profil trouvé</p>
          ) : (
            currentProfiles.map((profile) => (
              <ProfilCard
                key={profile.id}
                profilId={profile.id}
                fullName={profile.fullName}
                email={profile.details?.email || "Non disponible"}
                phone_number={profile.phone_number}
                date={profile.details?.date || "Non disponible"}
                gender={profile.details?.gender || "Non disponible"}
                image={profile.details?.image || null}
                bio={profile.details?.bio || "Non disponible"}
                company_name={profile.details?.company_name || "Non disponible"}
                address={profile.details?.address || "Non disponible"}
                domaine={profile.details?.domaine || "Non disponible"}
              />
            ))
          )}
        </div>

        {/* Only show Pagination if the total number of services is greater than postsPerPage */}
        {filteredProfiles.length > postsPerPage && (
          <Pagination
            totalPosts={filteredProfiles.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </main>
    );
  }
};

export default UserProfile;
