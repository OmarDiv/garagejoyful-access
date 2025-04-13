
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    toast.error('Please sign in to access this feature');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
