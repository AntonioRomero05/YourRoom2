import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import classRoutes from './routes.services';
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedAdministracion = ({ children }) => {
    const { user, loading } = useAuth();
    const [hasPermission, setHasPermission] = useState(false);
    const [isUserConsulted, setIsUserConsulted] = useState(false);
  
    useEffect(() => {
        const consultUser = async() => {
            try{
                const docSnap = await classRoutes.getUserType(user.uid);
                const hasAdminPermission = docSnap.data().rol === "Administrador";
                setHasPermission(hasAdminPermission);
                setIsUserConsulted(true);
                console.log(hasAdminPermission ? "es verdadero" : "es falso");
            }catch(error){
                console.log(error);
            }
        };

        if (user) {
            consultUser();
        }
    }, [user]);

    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/iniciarsesion" />;
    if (!isUserConsulted) return <Spinner />;

    return hasPermission ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedAdministracion;
