import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../configs/axiosClient.js";
import { UserContext } from "../contexts/ContextProvider";
import images from "../assets/index.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken, setRoles } = UserContext();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    phone_number: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { phone_number } = form;

    // Ajouter le code pays +228 au numéro de téléphone
    const formattedPhoneNumber = phone_number.startsWith("228")
      ? phone_number
      : `228${phone_number}`;

    // Envoyer les données au backend
    axiosClient
      .post("/login", {
        ...form,
        phone_number: formattedPhoneNumber,
      })
      .then((response) => {
        const { data } = response;
        setToken(data.token);
        setUser(data.user);
        setRoles(data.roles);
        navigate("/"); // Redirection seulement après succès
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 401) {
          // Gestion des erreurs pour le statut 401 (mauvais numéro ou mot de passe)
          setErrors({ message: response.data.message });
        } else if (response && response.status === 422) {
          // Gestion des erreurs de validation
          setErrors(response.data.errors);
        } else {
          // Gestion des autres types d'erreurs
          setErrors({ message: "Une erreur est survenue, veuillez réessayer." });
        }
      });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden lg:block lg:w-2/3 bg-cover"
          style={{ backgroundImage: `url(${images.Image3})` }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div className="bg-black bg-opacity-40 rounded-xl p-5">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl" style={{ fontFamily: "poetsen" }}>
                AgriConnect
              </h2>
              <p className="max-w-xl mt-3 text-gray-300 font-bold">
                Connectez-vous avec des professionnels de l&apos;agriculture,
                échangez des services et développez votre réseau.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center" style={{ fontFamily: "poetsen" }}>
              <p className="mt-3 text-gray-500 dark:text-gray-300 text-5xl font-bold">
                Bienvenue, heureux de vous revoir !
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Connectez-vous pour accéder à votre compte.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-4">
              <div className="mb-3">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Numéro de téléphone
                </label>
                <input
                  onChange={handleOnChange}
                  name="phone_number"
                  id="phone_number"
                  type="text"
                  placeholder="Votre numéro de téléphone"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone_number[0]}
                  </p>
                )}
                
              </div>

              <div className="mt-3">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Mot de passe
                  </label>
                  <a
                    href="#"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>

                </div>
                <input
                  onChange={handleOnChange}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password[0]}
                  </p>
                )}
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Se connecter
                </button>
              </div>
            </form>

            <p className="mt-6 text-sm text-center text-gray-400">
              Vous n&apos;avez pas encore de compte ?
              <Link
                to="/choix"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Inscrivez-vous
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
