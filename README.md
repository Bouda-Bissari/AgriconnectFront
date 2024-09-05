# Frontend User - Plateforme de mise en relation des acteurs agricoles

## Description
Ce projet frontend User, développé en React.js, fournit l'interface utilisateur pour la plateforme de mise en relation des acteurs agricoles. Il permet aux utilisateurs de naviguer à travers diverses fonctionnalités telles que la gestion des services, la visualisation des profils, et bien plus encore. Ce projet interagit avec le backend Laravel pour gérer les données et les interactions.

## Prérequis
Avant de démarrer, assurez-vous d'avoir installé :
- Node.js (version 14.x ou plus récente)
- npm ou yarn

## Installation et Démarrage

1. **Lancer le serveur backend** :
   - Avant de démarrer le frontend, assurez-vous que le serveur backend Laravel est en cours d'exécution.

2. **Configurer les variables d'environnement** :
   - Dans le répertoire `Front`, créez un fichier `.env` basé sur le fichier `.env.example` fourni, et configurez les variables d'environnement si nécessaire.

3. **Installer les dépendances** :
   - Depuis le répertoire `Front`, exécutez la commande suivante dans votre terminal :
     ```bash
     npm install
     ```
     ou
     ```bash
     yarn install
     ```

4. **Démarrer le serveur de développement** :
   - Exécutez la commande suivante pour lancer le serveur de développement :
     ```bash
     npm start
     ```
     ou
     ```bash
     yarn start
     ```
   - Par défaut, l'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).

## Routes

Voici les routes principales de l'interface utilisateur :

- **Pages d'accueil**
  - `/acceuil` : Page d'accueil
  - `/info` : Page "En savoir plus"

- **Utilisateurs**
  - `/users` : Liste des utilisateurs
  - `/users/new` : Formulaire de création d'utilisateur
  - `/users/:id` : Formulaire de mise à jour d'utilisateur

- **Services**
  - `/services` : Liste des services
  - `/services/detailservice/:jobId` : Détails du service
  - `/services/work` : Services liés au travail
  - `/services/Material` : Services liés aux matériaux

- **Profils**
  - `/ouvriers` : Liste des ouvriers
  - `/ouvriers/detailprofil/:profilId` : Détails du profil ouvrier
  - `/profil` : Page de profil
  - `/profil/:userId` : Détails du profil utilisateur
  - `/profil/createservice` : Formulaire de création de service
  - `/profil/updateservice/:jobId` : Formulaire de mise à jour de service
  - `/profil/servicedetail/:jobId/:Id` : Détails du service

- **Authentification et Gestion de Compte**
  - `/login` : Page de connexion
  - `/register/:role` : Page d'inscription
  - `/otp` : Page de vérification OTP
  - `/change-phone` : Page de changement de numéro de téléphone
  - `/choix` : Page de choix
  - `/details` : Page de détails du formulaire

- **Rôles**
  - `/roles` : Liste des rôles
  - `/roles/create` : Formulaire de création de rôle
  - `/roles/:id` : Détails du rôle
  - `/roles/:id/edit` : Formulaire de mise à jour du rôle
  - `/roles/:id/delete` : Suppression du rôle

- **Candidatures et Notifications**
  - `/profil/user/candidature` : Liste des candidatures utilisateur
  - `/profil/exploitant/candidature` : Liste des candidatures exploitant
  - `/profil/notifications` : Notifications

- **Erreurs**
  - `*` : Page NotFound

Les routes sont gérées via `react-router-dom` avec des mises en page spécifiques pour les sections invitées (`GuestLayout`) et utilisateur (`DefaultLayout`).

