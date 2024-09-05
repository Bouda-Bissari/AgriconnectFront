import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../configs/axiosClient.js";
import { UserContext } from "../contexts/ContextProvider.jsx";
import images from "../assets/index.jsx";

const Register = () => {
  const { role } = useParams();

  const navigate = useNavigate();
  const { setUser, setToken, setRoles,setIsCompleted } = UserContext();

  const [form, setForm] = useState({
    phone_number: "",
    fullName: "",
    password: "",
    role: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { password, password_confirmation, phone_number } = form;
    const validationErrors = {};

    if (password !== password_confirmation) {
      validationErrors.passwordConfirm =
        "Les mots de passe ne correspondent pas.";
    }

    // Validation du numéro de téléphone
    if (!/^\d{8,}$/.test(phone_number)) {
      validationErrors.phone_number = "Le numéro de téléphone est invalide.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    // Ajouter le code pays +228 au numéro de téléphone
    const formattedPhoneNumber = phone_number.startsWith("228")
      ? phone_number
      : `228${phone_number}`;

    try {
      const response = await axiosClient.post("/register", {
        ...form,
        phone_number: formattedPhoneNumber,
        role: role,
      });
      const { data } = response;
      console.log("Succès:", data);
      setToken(data.token);
      setUser(data.user);
      setRoles(data.role);
      setIsCompleted(data.is_completed)
      console.log("Navigating to /otp");
      navigate("/otp");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        console.log(response.data.errors);
      } else if (response && response.status === 400) {
        setValidationErrors({
          phone_number: response.data.error || "Une erreur est survenue.",
        });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden lg:block lg:w-2/3 bg-cover"
          style={{ backgroundImage: `url(${images.Image12})` }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div className="bg-black bg-opacity-40 rounded-xl p-5">
            <Link to={'/'} className="text-2xl font-extrabold hover:text-orange-300 sm:text-3xl text-orange-500" style={{ fontFamily: "poetsen" }}>
                AgriConnect
              </Link>
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
                Bienvenue, inscrivez-vous
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Enregistrez-vous pour accéder à votre compte
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-4">
              <div className="mb-3">
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Votre Nom Complet
                </label>
                <input
                  onChange={handleOnChange}
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder="KOFFI Eduard"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName[0]}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <select
                  name="countryCode"
                  value="+228"
                  disabled
                  className="w-1/4 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="228">+228 (TG)</option>
                </select>
                <input
                  onChange={handleOnChange}
                  name="phone_number"
                  id="phone_number"
                  required
                  placeholder="Votre numéro de téléphone"
                  className="block w-3/4 px-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {validationErrors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.phone_number}
                  </p>
                )}
                {errors.phone_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone_number[0]}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Mot de passe
                </label>
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
              </div>

              <div className="mt-3">
                <label
                  htmlFor="password_confirmation"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  onChange={handleOnChange}
                  name="password_confirmation"
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password_confirmation[0]}
                  </p>
                )}
                {validationErrors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.passwordConfirm}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  S&apos;inscrire
                </button>
              </div>
            </form>

            <p className="mt-3 text-sm text-center text-gray-400">
              Vous avez déjà un compte ?
              <Link
                to="/login"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Connectez-vous
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
