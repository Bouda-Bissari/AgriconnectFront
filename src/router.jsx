import { createBrowserRouter, Navigate } from "react-router-dom";
import { Acceuil } from "./views/Acceuil.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Users from "./views/Users.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import Otp from "./views/Otp.jsx";
import Register from "./views/Register.jsx";
import NotFound from "./views/NotFound.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";
import EnSavoirPlus from "./views/Info.jsx";
import ChangePhoneNumber from "./views/ChangePhoneNumber.jsx";
import ChoicePage from "./views/ChoicePage.jsx";
import DetailsForm from "./views/Details.jsx";
import RoleList from "./views/RoleList.jsx";
import CreateRole from "./views/CreateRole.jsx";
import RoleDetail from "./views/RoleDetail.jsx";
import EditRole from "./views/EditRole.jsx";
import DeleteRole from "./views/DeleteRole.jsx";
import Services from "./components/Services.jsx";
import Profil from "./views/Profil.jsx";
import ProfilDetails from "./components/ProfilDetails.jsx";
import DetailServices from "./views/DetailServices.jsx";
import UserProfile from "./views/UserProfile.jsx";
import DetailProfil from "./views/DetailProfil.jsx";
import UserServices from "./components/UserServices.jsx";
import CreateService from "./components/CreateService.jsx";
import DisplayCandidature from "./views/DisplayCandidature.jsx";
import DisplayCandidatureEx from "./views/DisplayCandidatureEx.jsx";
import ServicesWork from "./components/ServicesWork.jsx";
import ServicesMaterial from "./components/ServicesMaterial.jsx";
import ServiceApplications from "./views/ServiceApplications.jsx";
import DetailServicesEx from "./components/DetailServicesEx.jsx";
import UpdateService from "./components/UpdateService.jsx";
import Notifications from "./views/Notifications.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/acceuil" />,
      },
      {
        path: "/acceuil",
        element: <Acceuil />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
      {
        path: "/services/detailservice/:jobId",
        element: <DetailServices />,
      },
      {
        path: "/ouvriers/detailprofil/:profilId",
        element: <DetailProfil />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/info",
        element: <EnSavoirPlus />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/work",
        element: <ServicesWork />,
      },
      {
        path: "/services/Material",
        element: <ServicesMaterial />,
      },
      {
        path: "/ouvriers",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register/:role",
        element: <Register />,
      },
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/change-phone",
        element: <ChangePhoneNumber />,
      },
      {
        path: "/choix",
        element: <ChoicePage />,
      },
      {
        path: "/details",
        element: <DetailsForm />,
      },
      {
        path: "/roles",
        element: <RoleList />,
      },
      {
        path: "/roles/create",
        element: <CreateRole />,
      },
      {
        path: "/roles/:id",
        element: <RoleDetail />,
      },
      {
        path: "/roles/:id/edit",
        element: <EditRole />,
      },
      {
        path: "/roles/:id/delete",
        element: <DeleteRole />,
      },
    ],
  },
  {
    path: "/profil",
    element: <Profil />,
    children: [
      {
        path: "/profil/:userId",
        element: <ProfilDetails />,
      },
      {
        path: "/profil/createservice",
        element: <CreateService />,
      },
      {
        path: "/profil/user/:userId/services",
        element: <UserServices />,
      },
      {
        path: "/profil/user/candidature",
        element: <DisplayCandidature />,
      },
      {
        path: "/profil/exploitant/candidature",
        element: <DisplayCandidatureEx />,
      },
    ],
  },
  {
    path: "/",
    element: <Profil />,
    children: [
      {
        path: "/profil/:userId",
        element: <ProfilDetails />,
      },
      {
        path: "/profil/notifications",
        element: <Notifications />,
      },
      {
        path: "/profil/createservice",
        element: <CreateService />,
      },
      {
        path: "/profil/updateservice/:jobId",
        element: <UpdateService />,
      },
      {
        path: "/profil/servicedetail/:jobId/:Id",
        element: <DetailServicesEx />,
      },
      {
        path: "/profil/user/:userId/services",
        element: <UserServices />,
      },
      {
        path: "/profil/user/candidature",
        element: <DisplayCandidature />,
      },
      {
        path: "/profil/user/:jobId/candidatures",
        element: <ServiceApplications />,
      },
      {
        path: "/profil/exploitant/candidature",
        element: <DisplayCandidatureEx />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
