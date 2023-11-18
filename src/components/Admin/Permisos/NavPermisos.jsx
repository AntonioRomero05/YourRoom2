import React, {useState, useEffect} from 'react';
import Panel from './Panel';
import { Typography} from '@mui/material';
import classAdmin from './admin.services';

const NavPermisos = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        const data = await classAdmin.getAllTypeUser();
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    function handleUserChange(id, field, value) {
        classAdmin.updateTypeUser(id, field, value);
        getUsers();
    }

    return (
        <div>
            <Typography gutterBottom variant="h6" component="div">
                Permisos de Usuarios
            </Typography>
            <Panel users={users} onChange={handleUserChange}/>
        </div>
    );
};

export default NavPermisos;