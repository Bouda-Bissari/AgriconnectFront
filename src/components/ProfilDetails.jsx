import { useState, useEffect } from "react";
import { person } from "../assets/index.js";
import axios from "../configs/axiosClient.js";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider.jsx";

const ProfilDetails = () => {
  const { userId } = useParams();
  const { token } = UserContext();

  // if (!token) {
  //   return <Navigate to={"/acceuil"} />;
  // }

  const [profile, setProfile] = useState({
    email: "",
    date: "",
    gender: "",
    avatar_url: "",
    bio: "",
    company_name: "",
    address: "",
    domaine: "",
    fullName: "",
    phone_number: "",
    imageFile: null,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`/profile/${userId}`)
      .then((response) => {
        const userData = response.data;
        const details = userData.details || {};
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: details.email || "",
          date: details.date || "",
          gender: details.gender || "",
          avatar_url: details.avatar_url || person,
          bio: details.bio || "",
          company_name: details.company_name || "",
          address: details.address || "",
          domaine: details.domaine || "",
          fullName: userData.fullName || "",
          phone_number: userData.phone_number || "",
        }));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError("Vous n'êtes pas autorisé à accéder à ce profil.");
          } else if (error.response.status === 404) {
            setError("Profil non trouvé.");
          } else {
            setError(
              "Une erreur est survenue lors de la récupération du profil."
            );
          }
        } else {
          setError("Une erreur est survenue.");
        }
        console.error(
          "Il y a eu une erreur lors de la récupération du profil :",
          error
        );
      });
  }, [userId]);

  const handleChange = (event) => {
    const { id, value, type } = event.target;
    if (type === "radio") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        gender: value,
      }));
    } else if (type === "select-one") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        domaine: value,
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [id]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      imageFile: file,
      avatar_url: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", userId);
    formData.append("email", profile.email);
    formData.append("date", profile.date);
    formData.append("gender", profile.gender);
    formData.append("bio", profile.bio);
    formData.append("company_name", profile.company_name);
    formData.append("address", profile.address);
    formData.append("domaine", profile.domaine);
    formData.append("fullName", profile.fullName);
    formData.append("phone_number", profile.phone_number);

    if (profile.imageFile) {
      formData.append("avatar_url", profile.imageFile);
    }

    // Inspect FormData contents
    for (let [key, value] of formData.entries()) {
      console.log("sendingData", key, value);
    }

    console.log(profile)

    axios
      .put(`/profile/${userId}`, profile)
      .then((response) => {
        setSuccessMessage("Profil mis à jour avec succès.");
        console.log("Profil mis à jour avec succès :", response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError("Vous n'êtes pas autorisé à mettre à jour ce profil.");
          } else if (error.response.status === 404) {
            setError("Profil non trouvé.");
          } else {
            setError(
              "Une erreur est survenue lors de la mise à jour du profil."
            );
          }
        } else {
          setError("Une erreur est survenue.");
        }
        console.error(
          "Il y a eu une erreur lors de la mise à jour du profil :",
          error
        );
      });
  };

  const handleDeleteImage = () => {
    axios
      .delete(`/api/user/profile/${userId}/image`)
      .then(() => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar_url: person,
          imageFile: null,
        }));
        setSuccessMessage("Image supprimée avec succès.");
        console.log("Image supprimée avec succès");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError("Vous n'êtes pas autorisé à supprimer cette image.");
          } else if (error.response.status === 404) {
            setError("Image non trouvée.");
          } else {
            setError(
              "Une erreur est survenue lors de la suppression de l'image."
            );
          }
        } else {
          setError("Une erreur est survenue.");
        }
        console.error(
          "Il y a eu une erreur lors de la suppression de l'image :",
          error
        );
      });
  };

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profil Public</h2>

          {error && <div className="text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500"
                src={profile.avatar_url || person}
                alt="Avatar avec bordure"
              />

              <div className="flex flex-col space-y-5 sm:ml-8">
                <label className="py-3.5 px-7 text-base font-medium text-orange-100 focus:outline-none bg-[#202142] rounded-lg border border-orange-200 hover:bg-orange-900 focus:z-10 focus:ring-4 focus:ring-orange-200">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Changer l&apos;image
                </label>
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="py-3.5 px-7 text-base font-medium text-orange-900 focus:outline-none bg-white rounded-lg border border-orange-200 hover:bg-orange-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-orange-200"
                >
                  Supprimer l&apos;image
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="items-center mt-8 sm:mt-14 text-[#202142]"
            >
              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="votre.email@mail.com"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Jean Dupont"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Numéro de téléphone
                </label>
                <input
                  type="text"
                  id="phone_number"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="228 12345678"
                  value={profile.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="date"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  value={profile.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 ">
                  Genre
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender_masculin"
                      name="gender"
                      value="Masculin"
                      checked={profile.gender === "Masculin"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="gender_masculin"
                      className="text-sm font-medium text-orange-900 "
                    >
                      Masculin
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender_feminin"
                      name="gender"
                      value="Féminin"
                      checked={profile.gender === "Féminin"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="gender_feminin"
                      className="text-sm font-medium text-orange-900 "
                    >
                      Féminin
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="domaine"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Domaine
                </label>
                <select
                  id="domaine"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  value={profile.domaine}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez un domaine</option>
                  <option value="Culture de céréales">
                    Culture de céréales
                  </option>
                  <option value="Culture de légumes">Culture de légumes</option>
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
                  <option value="Gestion des fermes">Gestion des fermes</option>
                  <option value="Consultation en agriculture">
                    Consultation en agriculture
                  </option>
                  <option value="Vente de produits agricoles">
                    Vente de produits agricoles
                  </option>
                  <option value="Formation agricole">Formation agricole</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Biographie
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Écrivez quelques lignes sur vous..."
                  value={profile.bio}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Mettre à jour le profil
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilDetails;
