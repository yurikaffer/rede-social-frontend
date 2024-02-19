import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../api/Service/AuthService';

const ProtectedRoute: React.FC<{ path: string; element: React.ReactElement }> = ({ path, element }) => {
    return AuthService.isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
