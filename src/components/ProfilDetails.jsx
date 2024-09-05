import { useState, useEffect } from "react";
import images from "../assets/index.jsx";
import axios from "../configs/axiosClient.js";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider.jsx";
import imagePath from "../configs/imageUrl";
import { useToast } from "@/components/ui/use-toast"

const ProfilDetails = () => {
  const { userId } = useParams();
  const { token,setIsCompleted } = UserContext();
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    email: "",
    date: "",
    gender: "",
    image: null,
    bio: "",
    company_name: "",
    address: "",
    domaine: "",
    fullName: "",
    phone_number: "",
    imageFile: null,
  });


    // Fonction pour formater les numéros de téléphone
const formatPhoneNumber = (phone) => {
  if (!phone || phone.length !== 11) return phone; // Vérifie si le numéro est valide

  const countryCode = phone.slice(0, 3); 
  const part1 = phone.slice(3, 5); 
  const part2 = phone.slice(5, 7); 
  const part3 = phone.slice(7, 9); 
  const part4 = phone.slice(9, 11); 

  return `+${countryCode} ${part1} ${part2} ${part3} ${part4}`;
};

// Fonction pour enlever le formatage lors de l'édition
const handlePhoneNumberChange = (e) => {
  const value = e.target.value.replace(/\s+/g, '').replace('+228', '');
  setPhoneNumber(value);
};

  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
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
          date: details.date || "",
          gender: details.gender || "",
          // image: details.image || images.person,
          image: details.image ? `${imagePath}/${details.image}` : null,

          bio: details.bio || "",
          company_name: details.company_name || "",
          address: details.address || "",
          domaine: details.domaine || "",
          fullName: userData.fullName || "",
          phone_number: userData.phone_number || "",
        }));
        setPhoneNumber(userData.phone_number || ""); 
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError({
              general: "Vous n'êtes pas autorisé à accéder à ce profil.",
            });
          } else if (error.response.status === 404) {
            setError({ general: "Profil non trouvé." });
          } else {
            setError({
              general:
                "Une erreur est survenue lors de la récupération du profil.",
            });
          }
        } else {
          setError({ general: "Une erreur est survenue." });
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
      image: URL.createObjectURL(file), // Affichage de l'image sélectionnée
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("email", profile.email);
    formData.append("date", profile.date);
    formData.append("gender", profile.gender);
    formData.append("bio", profile.bio);
    formData.append("company_name", profile.company_name);
    formData.append("address", profile.address);
    formData.append("domaine", profile.domaine);
    formData.append("phone_number", profile.phone_number);

    if (profile.imageFile) {
      // Utilisateur a sélectionné un fichier d'image
      formData.append("image", profile.imageFile);
    } else if (profile.image) {
      // Utiliser l'URL de l'image fournie
      try {
        const response = await fetch(profile.image);
        const imageBlob = await response.blob();
        const defaultImageFile = new File([imageBlob], "profile-image.jpg", {
          type: imageBlob.type,
        });
        formData.append("image", defaultImageFile);
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image:", error);
      }
    } else {
      // Utiliser une image par défaut
      const imageUrl = images.person; // URL de l'image par défaut
      try {
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();
        const defaultImageFile = new File([imageBlob], "default-image.jpg", {
          type: imageBlob.type,
        });
        formData.append("image", defaultImageFile);
      } catch (error) {
        console.error(
          "Erreur lors du téléchargement de l'image par défaut:",
          error
        );
      }
    }

    // Ajouter le paramètre de spoofing de méthode
    formData.append("_method", "PUT");

    // Afficher les données de formData dans la console
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post(`/profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Profil mis à jour avec succès.");
        setIsCompleted(response.data.completed);

        toast({
          position: "top-right",
          className:"text-2xl",
          title: "Mise a jours reuissie",
          description: "Votre profil a ete mis a jour.",
          status: "success",
          isClosable: true,
          icon: '✔️', 
          style: {
            backgroundColor: '#4caf50', // Couleur de fond
            color: '#fff',
            fontFamily:'poesten'
          },
          
          transition: 'Bounce',
          
        });
        console.log("Profil mis à jour avec succès :", response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError({
              general: "Vous n'êtes pas autorisé à mettre à jour ce profil.",
            });
          } else if (error.response.status === 404) {
            setError({ general: "Profil non trouvé." });
          } else if (error.response.data.errors) {
            // Erreurs de validation spécifiques
            setError(error.response.data.errors);
          } else {
            setError({
              general:
                "Une erreur est survenue lors de la mise à jour du profil.",
            });
          }
        } else {
          setError({ general: "Une erreur est survenue." });
        }
        console.error(
          "Il y a eu une erreur lors de la mise à jour du profil :",
          error
        );
      });
  };

  // Redirection d'un utilisateur non connecté
  if (!token) {
    return <Navigate to={"/acceuil"} />;
  }

  return (
    <main className="w-full h-screen py-1 z-10">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profil Public</h2>

          {error.general && <div className="text-red-500">{error.general}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              {/* 
{profile.image!==images.person? (
          
            <img
              src={`${imagePath}/${profile.image}`}
              alt="Profile Image"
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500" />
):(<img
  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500"
  src={images.person}
  alt="Avatar avec bordure"
/>)
} */}

              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile Image"
                  onError={(e) => {
                    e.target.src = images.person; 
                  }}
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500"
                />
              ) : (
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500"
                  src={images.person}
                  alt="Avatar avec bordure"
                />
              )}

              <div className="flex flex-col space-y-5 sm:ml-8">
                <label className="py-3.5 px-7 text-base font-medium text-orange-100 focus:outline-none bg-[#202142] rounded-lg border border-orange-200 hover:bg-orange-900 focus:z-10 focus:ring-4 focus:ring-orange-200">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Changer l&apos;image
                </label>
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
                  className={`bg-orange-50 border ${
                    error.email ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  placeholder="votre.email@mail.com"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
                {error.email && (
                  <p className="text-red-500 text-xs mt-1">{error.email}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="fullName"

                  className={`bg-orange-50 border ${
                    error.fullName ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  placeholder="Jean Dupont"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                />
                {error.fullName && (
                  <p className="text-red-500 text-xs mt-1">{error.fullName}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
              <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Numéro de Téléphone
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone_number"
                      value={phoneNumber}
                      required
                      onChange={handlePhoneNumberChange}
                      className="border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    />
                  ) : (
                    <input
                      type="text"
                      id="phone_number"
                      value={formatPhoneNumber(phoneNumber)}
                      readOnly
                      className="border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                      onFocus={() => setIsEditing(true)}
                    />
                  )}
                </label>
                {error.phone_number && (
                  <div className="text-red-500">{error.phone_number}</div>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  className={`bg-orange-50 border ${
                    error.address ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  placeholder="123 Rue Exemple"
                  value={profile.address}
                  onChange={handleChange}
                  required
                />
                {error.address && (
                  <p className="text-red-500 text-xs mt-1">{error.address}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Date de naissance
                </label>
                <input
                  type="date"
                  id="date"
                  className={`bg-orange-50 border ${
                    error.date ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  value={profile.date}
                  onChange={handleChange}
                  required
                />
                {error.date && (
                  <p className="text-red-500 text-xs mt-1">{error.date}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Sexe
                </label>
                <div className="flex">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="Masculin"
                      checked={profile.gender === "Masculin"}
                      onChange={handleChange}
                      className="form-radio"
                      required
                    />
                    <span className="ml-2">Homme</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Feminin"
                      checked={profile.gender === "Feminin"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Femme</span>
                  </label>
                </div>
                {error.gender && (
                  <p className="text-red-500 text-xs mt-1">{error.gender}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Domaine
                </label>
                <select
                  id="domaine"
                  className={`bg-orange-50 border ${
                    error.domaine ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  value={profile.domaine}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un domaine</option>
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
                </select>
                {error.domaine && (
                  <p className="text-red-500 text-xs mt-1">{error.domaine}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  className={`bg-orange-50 border ${
                    error.bio ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  placeholder="Parlez de vous..."
                  value={profile.bio}
                  onChange={handleChange}
                  required
                />
                {error.bio && (
                  <p className="text-red-500 text-xs mt-1">{error.bio}</p>
                )}
              </div>

              <div className="mb-2 sm:mb-6">
                <label className="block mb-2 text-sm font-medium text-orange-900 dark:text-white">
                  Nom de l&apos;entreprise
                </label>
                <input
                  type="text"
                  id="company_name"
                  className={`bg-orange-50 border ${
                    error.company_name ? "border-red-500" : "border-orange-300"
                  } text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5`}
                  placeholder="Entreprise XYZ"
                  value={profile.company_name}
                  onChange={handleChange}
                />
                {error.company_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {error.company_name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-[#202142] hover:bg-orange-900 focus:outline-none focus:ring-4 focus:ring-orange-200"
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
