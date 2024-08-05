import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {
  const { token } = useStateContext();

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
