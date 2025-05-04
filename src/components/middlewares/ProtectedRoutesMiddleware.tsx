import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const { accessToken, roles, sellerStatus } = useSelector(selectCurrentUser);
  const { pathname } = useLocation();
  if (accessToken && roles.includes("seller")) {
    if (
      (sellerStatus == "active" || sellerStatus == "inactive") &&
      roles.includes("seller")
    ) {
      return <Outlet />;
    } else {
      return <Navigate to={"/login"} state={{ from: pathname }} />;
    }
  } else return <Navigate to={"/login"} state={{ from: pathname }} />;
}

export default ProtectedRoutes;
