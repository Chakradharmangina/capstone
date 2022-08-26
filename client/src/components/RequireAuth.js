import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log(location);
  let finalLocation = "/login";
  if (localStorage.getItem("user-auth")) {
    finalLocation = location.pathname;
  }
  return auth?.ROLE?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.STATUS ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to={finalLocation} state={{ from: location }} replace />
  );
};

export default RequireAuth;
