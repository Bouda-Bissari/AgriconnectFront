import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RoleDetail = () => {
  const { id } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`/roles/${id}`);
        setRole(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
      }
    };

    fetchRole();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {role ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Détails du rôle</h1>
          <p className="mb-2"><strong>ID:</strong> {role.id}</p>
          <p className="mb-4"><strong>Nom:</strong> {role.name}</p>
          <Link to={`/roles/${id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Modifier
          </Link>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default RoleDetail;
