import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import classRoutes from './routes.services';
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedCuartos = ({ children }) => {
    const { user, loading } = useAuth();
    const [hasPermission, setHasPermission] = useState(false);
    const [isUserConsulted, setIsUserConsulted] = useState(false);
    const [permissionRoom, setPermissionRoom] = useState("");
  
    useEffect(() => {
        const consultUser = async() => {
            try{
                const docSnap = await classRoutes.getUserType(user.uid);
                const isAdmin = docSnap.data().rol === "Arrendador";
                setHasPermission(isAdmin);
                setIsUserConsulted(true);
                console.log(isAdmin ? "es verdadero tipo usuario" : "es falso tipo usuario");
                console.log(docSnap.data().rol)
                // const docTypeUser = await classRoutes.getTypePermission(docSnap.data().rol);
                // docTypeUser.forEach((doc) => {
                //     // setPermissionRoom(doc.Cuartos);
                //     console.log(doc.Cuartos)
                // });
                // console.log("Termina");
                // const hasAdminPermission = docTypeUser.docs.map((doc) => (doc.Cuartos));
                // console.log(hasAdminPermission)
                // console.log(hasAdminPermission ? "es verdadero permiso" : "es falso permiso");

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

export default ProtectedCuartos;