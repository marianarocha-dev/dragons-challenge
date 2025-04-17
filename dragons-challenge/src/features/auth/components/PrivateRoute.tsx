import { Navigate } from 'react-router-dom';
import { PrivateLayout } from '../../../shared/components/PrivateLayout';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem('currentUser') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}