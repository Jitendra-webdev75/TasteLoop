import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || true; // Apne auth logic ke hisaab se update karein

  if (!token) {
    return <navigate to="/user/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
