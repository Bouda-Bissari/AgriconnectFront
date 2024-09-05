import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserContext } from "../contexts/ContextProvider.jsx";

export function AlertCompleted() {
  const navigate = useNavigate();
  const {  isCompleted, token } = UserContext();
  const userCompleted = isCompleted;
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  // Vérifiez si l'utilisateur est connecté
  if (!token) {
    return null;
  }

  // Gestion de la redirection vers le profil
  const handleRedirect = () => {
    navigate(`/profil/${userId}`);
  };

  if (!userCompleted) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-yellow-500  text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <AlertTitle className="font-bold">Profil Incomplet</AlertTitle>
            <AlertDescription>
              Votre profil est incomplet. Veuillez compléter votre profil avant
              de le publier.
            </AlertDescription>
          </div>
        </div>
        <Button
          onClick={handleRedirect}
          className="bg-white text-blue-500 hover:bg-gray-100"
        >
          Compléter le Profil
        </Button>
      </div>
    );
  }

  return null;
}
