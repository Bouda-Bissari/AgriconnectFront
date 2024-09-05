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
import { UserContext } from "@/contexts/ContextProvider";

// eslint-disable-next-line react/prop-types
export function PostulerDialog({ onConfirm }) {
  const { roles } = UserContext();

  // Vérifiez si l'utilisateur a déjà le rôle "ouvrier"
  const hasOuvrierRole = roles.includes("ouvrier");

  return (
      <AlertDialog>
          <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-black">Postuler</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer votre candidature</AlertDialogTitle>
                  <AlertDialogDescription>
                      Vous êtes sur le point de postuler pour ce service. Veuillez confirmer
                      que vous souhaitez soumettre votre candidature. 
                      {!hasOuvrierRole && (
                          <>
                              <br />
                              Vous ne possédez pas le rôle <span className="text-orange-500 text-bold">ouvrier</span>, celui-ci vous sera automatiquement ajouté.
                          </>
                      )}
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                      onClick={() => {
                          onConfirm(); 
                      }}
                  >
                      Confirmer
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}
