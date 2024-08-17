// src/components/SearchComponent.jsx
import { useState } from "react";

const categories = [
  'Culture de céréales',
  'Culture de légumes',
  'Culture de fruits',
  'Culture de tubercules',
  'Élevage de bétail',
  'Élevage de volailles',
  'Aquaculture',
  'Jardinage',
  'Sarclage',
  'Arboriculture',
  'Horticulture',
  'Viticulture',
  'Culture de plantes médicinales',
  'Cultures sous serre',
  'Agroforesterie',
  'Culture bio',
  'Recrutement de travailleurs agricoles',
  'Gestion des fermes',
  'Consultation en agriculture',
  'Vente de produits agricoles',
  'Formation agricole',
];

// eslint-disable-next-line react/prop-types
const SearchComponent = ({ onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown
    onSearch(searchQuery, category); // Trigger search with updated category
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory); // Trigger search with query and category
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSearch}>
      <div className="relative flex">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        >
          {selectedCategory}{" "}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          >
            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input
            type="search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
      </div>
    </form>
  );
};

export default SearchComponent;
