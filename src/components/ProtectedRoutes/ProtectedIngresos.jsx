import React, {useState} from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import Spinner from '../../pages/Spinner/Spinner';

const ProtectedIngresos = () => {
    const { user, loading } = useAuth();
    const [users, setUsers] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    async function getRol(uid){
        const docRef = doc(db, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docRef);
        const infoFinal = docuCifrada.data().rol;
        return infoFinal;
    }

    async function getAccess(rolUser){
        const q = query(collection(db, "permisos"), where("TipoUsuario", "==", rolUser));
        return await getDocs(q);
    }

    if (loading) return <Spinner/>;

    if(user){
        getRol(user.uid).then((rol) => {
            getAccess(rol).then((data) => {
                setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            });
        });
        {users.map((doc) => {
            if(doc.Administracion!==false){
                return <Navigate to="/" />
            }else{
                return <Navigate to="/administracion" />
            }
        })} 
    }else{
        if (!user){
            return <Navigate to="/iniciarsesion" />
        }
    }

    return <>{children}</>;
};

export default ProtectedIngresos;