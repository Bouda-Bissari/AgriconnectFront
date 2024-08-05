import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const CreateRole = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/roles', { name });
    navigate('/roles');
    } catch (error) {
      console.error('Erreur lors de la création du rôle:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer un rôle</h1>
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
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateRole;
