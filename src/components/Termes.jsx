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
  
  // eslint-disable-next-line react/prop-types
  export function Termes() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <a className="hover:underline cursor-pointer">
            Termes & Conditions
          </a>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Termes & Conditions</AlertDialogTitle>
            <AlertDialogDescription>
              En utilisant notre plateforme, vous acceptez les Termes & Conditions suivants :
              <br />
              <br />
              1. Notre plateforme est dédiée à la mise en relation des acteurs du secteur agricole.
              <br />
              2. Les utilisateurs doivent fournir des informations exactes et mettre à jour leur profil régulièrement.
              <br />
              3. Les transactions réalisées sur la plateforme relèvent de la seule responsabilité des parties impliquées.
              <br />
              4. Nous ne garantissons pas la disponibilité continue du service et nous déclinons toute responsabilité en cas d'interruption temporaire.
              <br />
              5. Toute utilisation abusive de la plateforme entraînera la suspension ou la suppression du compte utilisateur.
              <br />
              <br />
              Nous vous encourageons à lire ces Termes & Conditions avec attention avant de continuer à utiliser notre plateforme.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  