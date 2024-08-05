import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    num: "",
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

    setErrors(null);
    axiosClient
      .post("/login", form)
      .then((response) => {
        const { data } = response;
        console.log("Success:", data);
        setToken(data.token);
        setUser(data.user);

        // Redirection en fonction du rôle
        const role = data.role;
        if (role === "paysant") {
          navigate("/paysant");
        } else if (role === "employeur") {
          navigate("/employeur");
        } else {
          navigate("/"); 
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: "url('src/assets/Image3.jpg')" }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                AgriConnect
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Connectez-vous avec des professionnels de l&apos;agriculture, échangez des services et développez votre réseau.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              
              <p className="mt-3 text-gray-500 dark:text-gray-300 text-5xl font-bold">
                Bienvenue, heureux de vous revoir !
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Connectez-vous pour accéder à votre compte.
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="num"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Numéro de téléphone
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    name="num"
                    placeholder="Votre numéro de téléphone"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.num && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.num[0]}
                    </p>
                  )}
                </div>

                <div className="mt-6">
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
                    type="password"
                    name="password"
                    placeholder="Votre mot de passe"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password[0]}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Se connecter
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Vous n &aps;avez pas encore de compte ?
                <Link
                  to="/register"
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
    </div>
  );
}
