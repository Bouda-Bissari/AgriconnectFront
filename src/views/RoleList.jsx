import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        console.log('Réponse de l\'API:', response.data); // Vérifiez la structure des données
        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          setError('Les données récupérées ne sont pas au format attendu.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
        setError('Erreur lors de la récupération des rôles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des rôles</h1>
      <Link to="/roles/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        Créer un rôle
      </Link>
      <div className="mt-4">
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : roles.length > 0 ? (
          <ul>
            {roles.map((role) => (
              <li key={role.id} className="border-b py-2">
                <Link to={`/roles/${role.id}`} className="text-blue-500">
                  {role.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun rôle trouvé</p>
        )}
      </div>
    </div>
  );
};

export default RoleList;
