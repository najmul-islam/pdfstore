import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default UserLayout;
