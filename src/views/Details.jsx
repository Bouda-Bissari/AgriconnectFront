import { useState } from "react";
import axios from "axios";

const DetailsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    last_name: "",
    first_name: "",
    age: "",
    gender: "",
    avatar_url: "",
    bio: "",
    address: "",
    domaine: "",
    company_name: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await axios.post("/details", formData);
      setIsModalOpen(true); // Open modal after successful update
    } catch (error) {
      console.error("Erreur lors de la mise à jour des détails:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className=" bg-cover"
      style={{ backgroundImage: "url('src/assets/Image11.jpg')" }}
    >
      <div className="bg-black bg-opacity-40 ">
        <div className="mx-auto p-4  max-w-2xl h-full md:h-auto opacity-90">
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 bg-opacity-50">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Remplissez Vos Informations
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 dark:text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Fermer le modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Votre email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Votre nom de famille"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Âge
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Votre âge"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Genre
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Sélectionner le genre</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Biographie
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Écrivez une courte biographie"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Votre adresse"
                  />
                </div>
                <div>
                  <label
                    htmlFor="domaine"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Domaine
                  </label>     

                  <select
                    name="domaine"
                    value={formData.domaine}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Sélectionnez Domaine</option>
                    <option value="Culture de céréales">
                      Culture de céréales
                    </option>
                    <option value="Culture de légumes">
                      Culture de légumes
                    </option>
                    <option value="Culture de fruits">Culture de fruits</option>
                    <option value="Culture de tubercules">
                      Culture de tubercules
                    </option>
                    <option value="Élevage de bétail">Élevage de bétail</option>
                    <option value="Élevage de volailles">
                      Élevage de volailles
                    </option>
                    <option value="Aquaculture">Aquaculture</option>
                    <option value="Jardinage">Jardinage</option>
                    <option value="Sarclage">Sarclage</option>
                    <option value="Arboriculture">Arboriculture</option>
                    <option value="Horticulture">Horticulture</option>
                    <option value="Viticulture">Viticulture</option>
                    <option value="Culture de plantes médicinales">
                      Culture de plantes médicinales
                    </option>
                    <option value="Cultures sous serre">
                      Cultures sous serre
                    </option>
                    <option value="Agroforesterie">Agroforesterie</option>
                    <option value="Culture bio">Culture bio</option>
                    <option value="Recrutement de travailleurs agricoles">
                      Recrutement de travailleurs agricoles
                    </option>
                    <option value="Gestion des fermes">
                      Gestion des fermes
                    </option>
                    <option value="Consultation en agriculture">
                      Consultation en agriculture
                    </option>
                    <option value="Vente de produits agricoles">
                      Vente de produits agricoles
                    </option>
                    <option value="Formation agricole">
                      Formation agricole
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2 h-full">
                  <label
                    htmlFor="avatar_url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    URL de l&apos;avatar
                  </label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="avatar_url"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        name="avatar_url"
                        id="avatar_url"
                        value={formData.avatar_url}
                        onChange={handleChange}
                        placeholder="URL de votre avatar"
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom de l&apos;entreprise
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Soumettre
              </button>
            </form>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div
              id="defaultModal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-50"
            >
              <div className=" p-4 w-full max-w-2xl h-full md:h-auto">
                <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                  <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Mise à jour réussie
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 dark:text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Fermer le modal</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p>
                      Détails mis à jour avec succès. Vous pouvez ajouter plus
                      de détails ici.
                    </p>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
