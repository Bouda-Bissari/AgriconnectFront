import { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';

const EditRole = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`/roles/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
      }
    };

    fetchRole();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/roles/${id}`, { name });
      navigate('/roles');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier le rôle</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditRole;
