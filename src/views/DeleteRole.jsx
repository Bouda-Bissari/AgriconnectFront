import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/roles/${id}`);
      history.push('/roles');
    } catch (error) {
      console.error('Erreur lors de la suppression du rôle:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supprimer le rôle</h1>
      <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce rôle ?</p>
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Supprimer
      </button>
      <button onClick={() => navigate('/roles')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
        Annuler
      </button>
    </div>
  );
};

export default DeleteRole;
