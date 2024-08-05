import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser({ ...data, password: '', password_confirmation: '' });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { password, password_confirmation } = user;

    const validationErrors = {};
    if (password !== password_confirmation) {
      validationErrors.passwordConfirm = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setLoading(false);
      return;
    }

    const request = id
      ? axiosClient.put(`/users/${id}`, user)
      : axiosClient.post("/users", user);

    request
      .then(() => {
        setMessage(id ? "Utilisateur mis à jour avec succès." : "Utilisateur créé avec succès.");
        setLoading(false);
        navigate("/users");
      })
      .catch((error) => {
        setLoading(false);
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="flex items-center w-full max-w-md px-6 mx-auto">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-gray-500 dark:text-gray-300 text-5xl font-bold">
                {id ? "Update User" : "Create User"}
              </p>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {id ? "Update user details" : "Register to access your account"}
              </p>
            </div>

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={handleChange}
                    name="email"
                    id="email"
                    type="email"
                    value={user.email}
                    required
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                {!id && (
                  <>
                    <div className="mt-3">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          onChange={handleChange}
                          name="password"
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={user.password}
                          placeholder="Your Password"
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.354a10.477 10.477 0 00-.9 1.646M12 4.5c-3.314 0-6.33 1.493-8.02 3.854M12 19.5c3.314 0 6.33-1.493 8.02-3.854m-2.92-4.27a3 3 0 11-4.242-4.243m4.243 4.243L3.98 8.354m0 0A10.477 10.477 0 002.1 10.002c-1.592 2.756-1.592 6.243 0 9m0 0a10.477 10.477 0 001.88 2.648m0-9.646L20.02 15.648m0 0A10.477 10.477 0 0021.9 13.998c1.592-2.756 1.592-6.243 0-9m0 0a10.477 10.477 0 00-1.88-2.648m0 9.646L3.98 8.354"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.612 5 12 5c4.388 0 8.268 2.943 9.542 7-.182.577-.42 1.125-.704 1.64m-3.182 1.72A8.973 8.973 0 0112 19c-4.388 0-8.268-2.943-9.542-7a10.324 10.324 0 01-.704-1.64m3.182 1.72A8.973 8.973 0 0012 19c1.807 0 3.49-.535 4.928-1.44"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password[0]}
                        </p>
                      )}
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="password_confirmation"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          onChange={handleChange}
                          name="password_confirmation"
                          id="password_confirmation"
                          type={showPasswordConfirmation ? "text" : "password"}
                          value={user.password_confirmation}
                          placeholder="Confirm Your Password"
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 text-gray-400"
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        >
                          {showPasswordConfirmation ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.354a10.477 10.477 0 00-.9 1.646M12 4.5c-3.314 0-6.33 1.493-8.02 3.854M12 19.5c3.314 0 6.33-1.493 8.02-3.854m-2.92-4.27a3 3 0 11-4.242-4.243m4.243 4.243L3.98 8.354m0 0A10.477 10.477 0 002.1 10.002c-1.592 2.756-1.592 6.243 0 9m0 0a10.477 10.477 0 001.88 2.648m0-9.646L20.02 15.648m0 0A10.477 10.477 0 0021.9 13.998c1.592-2.756 1.592-6.243 0-9m0 0a10.477 10.477 0 00-1.88-2.648m0 9.646L3.98 8.354"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.612 5 12 5c4.388 0 8.268 2.943 9.542 7-.182.577-.42 1.125-.704 1.64m-3.182 1.72A8.973 8.973 0 0112 19c-4.388 0-8.268-2.943-9.542-7a10.324 10.324 0 01-.704-1.64m3.182 1.72A8.973 8.973 0 0012 19c1.807 0 3.49-.535 4.928-1.44"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password_confirmation[0]}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {validationErrors.passwordConfirm && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.passwordConfirm}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {loading ? "Loading..." : id ? "Update" : "Create"}
                  </button>
                </div>
              </form>
              {message && (
                <p className="mt-3 text-green-500 text-sm">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
