import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider.jsx";

const CompleteProfileDiv = () => {
  const navigate = useNavigate();
  const { isCompleted, user } = UserContext();

  // Redirect to profile completion page
  const handleRedirect = () => {
    navigate(`/profil/${user.id}`);
  };

  if (isCompleted) {
    return null; 
  }

  return (
    <div className="flex flex-col mt-4 ">
        <span>Votre Profile Est Incomplet veuillez le remplir pour avoir acces a tt les foncionnalites</span>
        <button
      onClick={handleRedirect}
      className="w-full mt-2 px-4 py-2 text-sm  font-semibold bg-yellow-500 rounded text-white hover:bg-red-900 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
    >
      Compléter le Profil
    </button>
    </div>
    
  );
};

export default CompleteProfileDiv;
