/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { person } from "../assets/index.js";
import axios from "../axiosClient.js";
import { useParams } from "react-router-dom";

const ProfilDetails = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState({
    email: "",
    age: "",
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

  useEffect(() => {
    axios
      .get(`/profile/${userId}`)
      .then((response) => {
        const userData = response.data;
        const details = userData.details || {};
        console.log(response.data);
        setProfile((prevProfile) => ({
          ...prevProfile,
          email: details.email || "",
          age: details.age || "",
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
        console.log(profile);
        console.error(
          "Il y a eu une erreur lors de la récupération du profil :",
          error
        );
      });
  }, [userId]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
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
    formData.append("age", profile.age);
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

    //Inspect FormData contents
    for (let [key, value] of formData.entries()) {
      console.log("sendingData");

      console.log(key, value);
    }

    axios
      .put(`/profile/${userId}`, formData)
      .then((response) => {
        console.log("Profil mis à jour avec succès :", response.data);
      })
      .catch((error) => {
        console.error(
          "Il y a eu une erreur lors de la mise à jour du profil :",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleDeleteImage = () => {
    // Remplacez l'URL par celle de votre API pour supprimer l'image du profil
    axios
      .delete(`/api/user/profile/${userId}/image`)
      .then((response) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar_url: person,
          imageFile: null,
        }));
        console.log("Image supprimée avec succès");
      })
      .catch((error) => {
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
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Votre email
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
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre nom complet"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Numéro de téléphone
                </label>
                <input
                  type="text"
                  id="phone_number"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre numéro de téléphone"
                  value={profile.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre âge"
                  value={profile.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Genre
                </label>
                <input
                  type="text"
                  id="gender"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Masculin ou Féminin"
                  value={profile.gender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="company_name"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Nom de l&pos;entreprise
                </label>
                <input
                  type="text"
                  id="company_name"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Nom de l'entreprise"
                  value={profile.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre adresse"
                  value={profile.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="domaine"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Domaine
                </label>
                <input
                  type="text"
                  id="domaine"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre domaine"
                  value={profile.domaine}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Biographie
                </label>
                <textarea
                  id="bio"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre biographie"
                  value={profile.bio}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="py-3.5 px-7 text-base font-medium text-white bg-orange-600 rounded-lg border border-orange-300 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilDetails;
