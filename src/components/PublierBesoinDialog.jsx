import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider"; // Assurez-vous que le chemin est correct

export function PublierBesoinDialog() {
  const navigate = useNavigate();
  const { roles } = UserContext(); // Récupérer les rôles du contexte

  const handleConfirm = () => {
    // Redirection après la confirmation
    navigate("/profil/createservice");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-white bg-green-700 ">
          Publier un besoin
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Information</AlertDialogTitle>
          <AlertDialogDescription>
            {roles.includes("exploitant")
              ? "Vous êtes déjà enregistré en tant qu'exploitant agricole."
              : "Vous n'êtes pas encore enregistré en tant qu'exploitant agricole. Ce titre vous sera attribué si vous publiez un besoin."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
