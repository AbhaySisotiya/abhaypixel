import { Navigate } from "react-router-dom";
import { useAuth } from '../Hooks/useAuth.jsx'

const ProtectedRoutes = ({ children }) => {
     const { islogin } = useAuth();

     if (!islogin) {
         return <Navigate to="/login" />;
     }
 
     return children;
 };
 

 export default ProtectedRoutes;