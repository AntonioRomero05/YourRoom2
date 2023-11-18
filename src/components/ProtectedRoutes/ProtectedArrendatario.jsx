import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedArrendatario = ({ children }) => {
    const { user, loading } = useAuth();

    async function getRol(uid){
        const docRef = doc(db, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docRef);
        const infoFinal = docuCifrada.data().rol;
        return infoFinal;
    }

    if (loading) return <Spinner/>;

    if(user){
        getRol(user.uid).then((rol) => {
            if(rol==='Arrendatario'){
                return <Navigate to="/" />
            }else{  
                return <Navigate to="/" />
            }
        });
    }else{
        if (!user){
            return <Navigate to="/iniciarsesion" />
        }
    }

    return <>{children}</>;
};

export default ProtectedArrendatario;