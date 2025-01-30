import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["loggedUser"]);
  console.log(cookies,"in protect route");
  

  // ✅ Redirect to login if no user cookie is found
  if (!cookies?.loggedUser?.isLogged) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;