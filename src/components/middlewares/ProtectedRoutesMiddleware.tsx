import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const { accessToken, roles, sellerStatus, boarded } =
    useSelector(selectCurrentUser);
  console.log("user ", accessToken, roles, sellerStatus, boarded);
  const { pathname } = useLocation();
  if (accessToken && roles.includes("seller")) {
    return <Outlet />;
  } else return <Navigate to={"/login"} state={{ from: pathname }} />;
}

export default ProtectedRoutes;
// if (boarded) {
//   if (sellerStatus == "active" || sellerStatus == "inactive") {
//     return <Outlet />;
//   } else {
//     return <Navigate to={"/not-allowed"} state={{ from: pathname }} />;
//   }
// } else {
//   return <Navigate to={"/boarding"} state={{ from: pathname }} />;
// }
