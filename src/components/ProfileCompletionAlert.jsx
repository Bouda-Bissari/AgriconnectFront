import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider.jsx";

const CompleteProfileButton = () => {
  const navigate = useNavigate();
  const { isCompleted, user } = UserContext();

  // Redirect to profile completion page
  const handleRedirect = () => {
    navigate(`/profil/${user.id}`);
  };

  if (isCompleted) {
    return null; // Do not render the button if the profile is complete
  }

  return (
    <button
      onClick={handleRedirect}
      className="w-full px-4 py-2 mt-10 text-sm font-semibold bg-red-500 rounded text-white hover:bg-red-900 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
    >
      Compléter le Profil
    </button>
  );
};

export default CompleteProfileButton;
