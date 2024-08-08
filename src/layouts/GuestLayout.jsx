import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const { token } = UserContext();

  if (token) {
    <Navigate to={"/users"} />;
  }
  return (
    <>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
