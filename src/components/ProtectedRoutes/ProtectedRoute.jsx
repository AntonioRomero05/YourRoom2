import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Spinner/>;

    if (!user) return <Navigate to="/iniciarsesion" />;

    return children ? children : <Outlet />;
};

export default ProtectedRoute;