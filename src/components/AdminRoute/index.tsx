import React from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
}

interface AdminRouteProps {
  children: React.ReactNode;
  user: User | null;
  redirectTo?: string;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  user,
  redirectTo = '/admin/login',
}) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
