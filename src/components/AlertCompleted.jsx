import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserContext } from "../contexts/ContextProvider.jsx";

export function AlertCompleted() {
  const navigate = useNavigate();
  const { user } = UserContext();

  // Gestion de la redirection vers le profil
  const handleRedirect = () => {
    navigate(`/profil/${user.id}`);
  };

  if (!user.is_completed) {
    return (
      <Alert variant="destructive" className="w-4/5 mx-auto mb-10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Profil Incomplet</AlertTitle>
        <AlertDescription>
          Votre profil est incomplet. Veuillez compléter votre profil avant de le publier.
        </AlertDescription>
        <Button onClick={handleRedirect} className="mt-2">
          Compléter le Profil
        </Button>
      </Alert>
    );
  }

  return null;
}
