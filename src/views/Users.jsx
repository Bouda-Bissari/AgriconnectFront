import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../configs/axiosClient.js";
import { UserContext } from "../contexts/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = UserContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axiosClient
      .get("/user")
      .then(({ data }) => {
        // Filtrer les utilisateurs où is_completed est true
        setUsers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setLoading(false);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axiosClient
        .delete(`/users/${id}`)
        .then(() => {
          setUsers(users);
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'utilisateur :", error);
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
              Ajouter un nouvel utilisateur
            </Link>
          </div>
          <table className="min-w-full bg-gray-800 text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Téléphone</th>
                <th className="p-3 text-left">Créé le</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="bg-gray-800">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.fullName}</td>
                    <td className="p-3">{user.phone_number}</td>
                    <td className="p-3">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                    <td className="p-3 flex items-center">
                      <Link
                        to={`/users/${user.id}`}
                        className="text-gray-400 hover:text-gray-100 mr-2 py-1 px-2 bg-green-700 rounded-md text-xs md:text-sm"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-gray-400 hover:text-gray-100 ml-2 py-1 px-2 bg-red-700 rounded-md text-xs md:text-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {loading && <p className="text-gray-300 mt-4">Chargement...</p>}
        </div>
      </div>
    </div>
  );
}
