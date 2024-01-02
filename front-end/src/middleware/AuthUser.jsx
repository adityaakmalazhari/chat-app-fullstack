import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthUser = ({ children }) => {
    const { currentUser, getCurrentUser } = useAuth();
    const token = localStorage.getItem("token")
    
    if (token) {
        getCurrentUser()
        return children;
    }
    console.log(currentUser)
    return <Navigate to="/login" />;
};

export default AuthUser;
