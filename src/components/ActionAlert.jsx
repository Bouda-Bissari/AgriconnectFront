/* eslint-disable react/prop-types */
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


const ActionAlert = ({ onLogin }) => {
    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-white font-bold bg-orange-400">publier un besoin</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Informations requises</AlertDialogTitle>
              <AlertDialogDescription>
                Vous devez completez votre profil pour pouvoir publier un besoin. 
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onLogin(); 
                }}
              >
                Completer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
}

export default ActionAlert
