import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axiosClient.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useStateContext();
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosClient
        .delete(`/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  if (!token) {
    return <Navigate to={"/acceuil"} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible">
          <div className="mb-4">
            <Link
              to="/users/new"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add New User
            </Link>
          </div>
          <table className="min-w-full bg-gray-800 text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-gray-800">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 flex items-center">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-gray-400 hover:text-gray-100 mr-2 py-1 px-2 bg-green-700 rounded-md text-xs md:text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-gray-400 hover:text-gray-100 ml-2 py-1 px-2 bg-red-700 rounded-md text-xs md:text-sm"
                    >
                      Delete
                    </button>

                    {/* <main className="flex items-center justify-center min-h-screen">
                      <button
                        className="btn btn-danger flex items-center bg-red-600 text-white rounded p-2"
                        onClick={() => setOpen(true)}
                      >
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        <span className="ml-2">Delete</span>
                      </button>

                      {open && (
                        <div
                          onClick={onClose}
                          className="fixed inset-0 flex justify-center items-center transition-colors bg-black/20"
                        >
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl shadow p-6 transition-all scale-100 opacity-100 relative"
                          >
                            <button
                              onClick={onClose}
                              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                            >
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
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div className="text-center w-56">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-14 h-14 mx-auto text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>

                              <div className="mx-auto my-4 w-48">
                                <h3 className="text-lg font-black text-gray-800">
                                  Confirm Delete
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to delete this item?
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <button
                                  className="btn btn-danger w-full bg-red-600 text-white p-2 rounded"
                                  onClick={() => deleteUser(user.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-light w-full bg-gray-600 text-white p-2 rounded"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </main> */}

                    {/* <Alert src={deleteUser(user.id)} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="text-gray-300 mt-4">Loading...</p>}
        </div>
      </div>
    </div>
  );

  // function onClose() {
  //   setOpen(false);
  // }
}
