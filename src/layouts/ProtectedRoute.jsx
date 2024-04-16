import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/user";
import { Toast } from "flowbite-react";
import { toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(userContext);

  if (user.token) {
    return children;
  } else {
    toast.error("you have to login in first!");
    return (
      <Navigate to="/signIn">
        <Toast />
      </Navigate>
    );
  }
};

export default ProtectedRoute;
