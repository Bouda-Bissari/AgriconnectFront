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
  export function Politique() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <a className="hover:underline cursor-pointer">
            Politique de confidentialité
          </a>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Politique de confidentialité</AlertDialogTitle>
            <AlertDialogDescription>
              Nous prenons la protection de vos données personnelles très au sérieux. 
              Voici les principaux points de notre politique de confidentialité :
              <br />
              <br />
              1. Nous collectons uniquement les informations nécessaires pour 
              vous fournir un service de qualité sur notre plateforme agricole.
              <br />
              2. Vos données ne seront partagées avec des tiers que dans le cadre 
              strict de la gestion de notre plateforme.
              <br />
              3. Vous avez le droit de demander l&apos;accès, la rectification ou la suppression 
              de vos données personnelles à tout moment.
              <br />
              4. Nous utilisons des mesures de sécurité avancées pour protéger vos 
              informations contre tout accès non autorisé.
              <br />
              5. En utilisant notre site, vous acceptez les pratiques décrites dans 
              cette politique de confidentialité.
              <br />
              <br />
              Nous vous invitons à lire attentivement cette politique pour comprendre 
              comment vos données sont traitées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  