import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedQuejas = ({ children }) => {
    const { user, loading } = useAuth();
    const [access, setAccess] = useState('');

    useEffect(() => {
        async function fetchData() {
        try {
            const docRef = doc(db, `usuarios/${user.uid}`);
            const docuCifrada = await getDoc(docRef);
            const rolUser = docuCifrada.data().rol;
            const docRef2 = doc(db, `permisos/${rolUser}`);
            const docuCifrada2 = await getDoc(docRef2);
            const cuartosAccess = docuCifrada2.data().Quejas;
            setAccess(cuartosAccess);
        } catch (error) {
            console.error(error);
        }
        }
        if (user) {
        fetchData();
        }
    }, [user]);

    if (loading) return <Spinner />;

    if (!user) {
        return <Navigate to="/iniciarsesion" />;
    }

    if (access === 'permitido') {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedQuejas;