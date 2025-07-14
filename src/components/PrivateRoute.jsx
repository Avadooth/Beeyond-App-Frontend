import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const user = jwtDecode(token);
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (err) {
    return <Navigate to="/" />;
  }
}
