import React, {useState} from 'react';
import { useAuth } from "../../context/authContext";
import { db } from '../../firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Login } from '@mui/icons-material';

const FrmArrendatario = () => {
    const { logout, signup } = useAuth();
    
    const [user, setUser] = useState({
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        codPostal: "",
        telefono: "",
        nacimiento: "",
        curp: "",
        sexo: "",
        rfc: "",
        email: "",
        password: "",
        rol: "Arrendatario",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = await signup(user.email, user.password);
            const docRef = doc(db, `usuarios/${userInfo.user.uid}`);
            await setDoc(docRef, {
                nombre: user.nombre, 
                apellidoP: user.apellidoP, 
                apellidoM: user.apellidoM, 
                telefono: user.telefono,
                nacimiento: user.nacimiento,
                sexo: user.sexo,
                email: user.email,
                rol: user.rol
            });
            await logout();
            setUser({
                nombre: "",
                apellidoP: "",
                apellidoM: "",
                codPostal: "",
                telefono: "",
                nacimiento: "",
                sexo: "",
                curp: "",
                rfc: "",
                email: "",
                password: "",
                rol: "Arrendador",
            });
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        id='nombre'
                        onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        autoComplete="Apellido paterno"                                   
                        label="Apellido Paterno"
                        name="apellidoP"
                        id='apellidoP'
                        onChange={(e) => setUser({ ...user, apellidoP: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Apellido Materno"
                        name="apellidoM"
                        id='apellidoM'
                        onChange={(e) => setUser({ ...user, apellidoM: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Telefono"
                        name='telefono'
                        id='telefono'
                        onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Fecha De Nacimiento"
                        sx={{ width: 267}}
                        name='nacimiento'
                        id="nacimiento"
                        onChange={(e) => setUser({ ...user, nacimiento: e.target.value })}
                    />
                </Grid>  
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: 267}}
                        fullWidth
                        label="sexo"
                        name='sexo'
                        id='sexo'
                        onChange={ (e) => setUser({ ...user, sexo: e.target.value })}
                    />
                </Grid>                                          
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Correo Electronico"
                        name="email"
                        onChange={ (e) => setUser({ ...user, email: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Contraseña"
                        id="password"
                        name="password"
                        onChange={ (e) => setUser({ ...user, password: e.target.value })}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                id='enviar'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<Login/>}
            >
                ACCEDER
            </Button>
        </Box>
    );
};

export default FrmArrendatario;