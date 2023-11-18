import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { Box, Grid, Typography, Button, FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import curp from 'curp';

import { useAuth } from "../../context/authContext";
import Validate from '../Registrarme/ClassValidate';

import Error from '../Alert/Error';
import Success from '../Alert/Success';

import { FunctionUpdateEmail } from './profile.servicies';

const Profile = () => {
    const { user } = useAuth();
    const [sexoU, setSexo] = useState('');
    const [error, setError] = useState("");

    const [updateEmail, setUpdateEmail] = useState({ email: user.email, password:  '' });
    const [errorUpdateEmail, setErrorUpdateEmail] = useState("");
    const [successUpdateEmail, setSuccessUpdateEmail] = useState("");
    
    const [updatePassword, setUpdatePassword] = useState('');

    const [userinfo, setUserInfo] = useState({
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        codPostal: "",
        telefono: "",
        nacimiento: "",
        sexo: "",
        curp: "",
    });

    const [errorName, setErrorName] = useState(false);
    const [leyendaName, setLeyendaName] = useState('');

    const [errorAPaterno, setErrorAPaterno] = useState(false);
    const [leyendaAPaterno, setLeyendaAPaterno] = useState('');
    const [errorAMaterno, setErrorAMaterno] = useState(false);
    const [leyendaAMaterno, setLeyendaAMaterno] = useState('');

    const [errorCurp, seterrorCurp] = useState(false);
    const [leyendaCurp, setleyendaCurp] = useState('');
    const [errorFecha, setErrorFecha] = useState(false);
    const [leyendaErrorFecha, setLeyendaErrorFecha] = useState('');

    const handleName =(e) => {
        var regex = /^[a-zA-ZÀ-ÿ ]+$/;
        if(regex.test(e.target.value)){
            setUserInfo({ ...userinfo, nombre: e.target.value });
            setLeyendaName('Entrada Valida');
            setErrorName(false);
        }else{
            setLeyendaName('Los Datos Deben Ser Tipo Texto');
            setErrorName(true);
        }
    }

    const handleAPaterno = (e) => {
        const validText = /^[a-zA-Z]+$/;
        const validLong = /^[a-zA-Z]{1,15}$/;
        if(validText.test(e.target.value)){
            if(validLong.test(e.target.value)){
                setErrorAPaterno(false);
                setLeyendaAPaterno('');
                setUserInfo({ ...userinfo, apellidoP: e.target.value });
            }else{
                setErrorAPaterno(true);
                setLeyendaAPaterno('La longitud maxima de este campo es de 15 caracteres');
            }
        }else{
            setErrorAPaterno(true);
            setLeyendaAPaterno('Este campo solo recibe letras, no aceptar numero ni simbolos especiales');
        }
    }

    const handleAMaterno = (e) => {
        const validText = /^[a-zA-Z]+$/;
        const validLong = /^[a-zA-Z]{1,15}$/;
        if(validText.test(e.target.value)){
            if(validLong.test(e.target.value)){
                setErrorAMaterno(false);
                setLeyendaAMaterno('');
                setUserInfo({ ...userinfo, apellidoM: e.target.value });
            }else{
                setErrorAMaterno(true);
                setLeyendaAMaterno('La longitud maxima de este campo es de 15 caracteres');
            }
        }else{
            setErrorAMaterno(true);
            setLeyendaAMaterno('Este campo solo recibe letras, no aceptar numero ni simbolos especiales');
        }
    }

    const handleFecha = (e) => {
        const fechaN = e.target.value;
        const isValid = Validate.validateDate(fechaN);
        if (isValid) {
            setErrorFecha(false);
            setLeyendaErrorFecha('');
            setUserInfo({ ...userinfo, nacimiento: fechaN });
        }else {
            setErrorFecha(true);
            setLeyendaErrorFecha('Fecha de nacimiento invalida, usted debe tener mas de 15 años pero no mas de 60');
        }
    }

    const handleCurp =(e)=> {
        if(curp.validar(e.target.value) === null){
            setleyendaCurp('La CURP no es valida');
            seterrorCurp(true);
        }else{
            setUserInfo({ ...userinfo, curp: e.target.value.toUpperCase() });
            setleyendaCurp('CURP Valida');
            seterrorCurp(false);
        }
    }
    
    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setError("");
        try {
            FunctionUpdateEmail(updateEmail.email, updateEmail.password);
            setSuccessUpdateEmail('Correo electrónico actualizado correctamente');
        } catch (err) {
            console.log(err);
            setErrorUpdateEmail('Error al actualizar el correo electrónico');
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setError("");
        // try {
        //     const userInfo = await login(user.email, user.password);
        //     getRol(userInfo.user.uid).then((rol) => {
        //         if(rol==='Arrendador'){
        //             navigate("/miscuartos");
        //         }
        //         if(rol==='Arrendatario'){
        //             navigate("/");
        //         }
        //         if(rol==='Administrador'){
        //             navigate("/administracion");
        //         }
        //     });
        // } catch (error) {
        //     if(error.code === "auth/user-not-found"){
        //         setError('El correo que ingresaste no existe');
        //     }
        //     if(error.code === "auth/wrong-password"){
        //         setError('La contraseña es incorrecta');
        //     }  
        // }
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setError("");
        // try {
        //     const userInfo = await login(user.email, user.password);
        //     getRol(userInfo.user.uid).then((rol) => {
        //         if(rol==='Arrendador'){
        //             navigate("/miscuartos");
        //         }
        //         if(rol==='Arrendatario'){
        //             navigate("/");
        //         }
        //         if(rol==='Administrador'){
        //             navigate("/administracion");
        //         }
        //     });
        // } catch (error) {
        //     if(error.code === "auth/user-not-found"){
        //         setError('El correo que ingresaste no existe');
        //     }
        //     if(error.code === "auth/wrong-password"){
        //         setError('La contraseña es incorrecta');
        //     }  
        // }
    };

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box>
                <Grid sx={{ mt: 4}}>
                    <Typography variant="h4" gutterBottom sx={{mt: 2, textAlign: 'center'}}>
                        Información de la cuenta
                    </Typography>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom>
                            Actualizar Correo Electronico
                        </Typography>
                        <Box component="form" sx={{ mt: 1, display: 'flex'}} onSubmit={handleSubmitEmail}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    {errorUpdateEmail && <Error message={errorUpdateEmail} />}
                                    {successUpdateEmail && <Success message={successUpdateEmail} />}                                
                                </Grid>
                                <Grid item xs={11}>
                                    <Grid item xs={11} sm={6}>
                                        <TextField
                                            margin="normal"      
                                            required
                                            autoFocus
                                            title="Campo correo obligatorio"   
                                            type="email"
                                            name="email"
                                            label='Correo Electronico'
                                            value={updateEmail.email}
                                            sx={{width: 418}}
                                            onChange={(e) => setUpdateEmail({ ...updateEmail, email: e.target.value })}     
                                        />
                                    </Grid>
                                    <Grid item xs={11} sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            autoFocus
                                            title="Campo contraseña obligatorio" 
                                            type="password"
                                            name="password"
                                            label='Contraseña'
                                            sx={{width: 418}}
                                            onChange={(e) => setUpdateEmail({ ...updateEmail, password: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="medium"
                                        fullWidth
                                        // sx={{ height: 55, marginRight: 3}}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                                
                        </Box>   
                    </Grid>
                    <Grid item xs={8} sx={{mt: 2}}>
                        <Typography variant="h6" gutterBottom>
                            Contraseña
                        </Typography>
                        <Box component="form" sx={{ mt: 1, display: 'flex', justifyContent: 'flex-start' }} onSubmit={handleSubmitPassword}>
                            <TextField
                                margin="normal"
                                required
                                autoFocus
                                title="Campo contraseña obligatorio" 
                                type="password"
                                name="password"
                                sx={{width: 300}}
                                onChange={(e) => setUpdatePassword({ ...updatePassword, password: e.target.value })}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                sx={{marginLeft: 2, height: 55, mt: 2}}
                            >
                                Guardar
                            </Button>
                        </Box>   
                    </Grid>
                </Grid>
                <Grid sx={{ mt: 4}}>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom>
                            Información personal
                        </Typography>
                        {error && <Error message={error} />}
                        <Box component="form" sx={{ mt: 1, display: 'flex' }} onSubmit={handleSubmitProfile}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo nombre obligatorio"  
                                        label="Nombre"
                                        name="nombre"
                                        fullWidth
                                        error={errorName}
                                        helperText={leyendaName}
                                        onChange={handleName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo apellido Paterno obligatorio"  
                                        autoComplete="Apellido paterno"                                   
                                        label="Apellido Paterno"
                                        name="apellidoP"
                                        fullWidth
                                        onChange={ handleAPaterno }
                                        error={ errorAPaterno }
                                        helperText={ leyendaAPaterno }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo apellido Materno obligatorio"  
                                        label="Apellido Materno"
                                        name="apellidoM"
                                        fullWidth
                                        onChange={ handleAMaterno }
                                        error={ errorAMaterno }
                                        helperText={ leyendaAMaterno }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo Codigo Postal obligatorio"  
                                        label="Codigo postal"
                                        name="codPostal"
                                        fullWidth
                                        onChange={(e)=> setUserInfo({ ...userinfo, codPostal: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo Telefono obligatorio"  
                                        label="Telefono"
                                        name='telefono'
                                        fullWidth
                                        onChange={(e) => setUserInfo({ ...userinfo, telefono: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo Fecha de nacimiento obligatorio"  
                                        label="Fecha De Nacimiento"
                                        type="date"
                                        defaultValue="2002-01-05"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name='nacimiento'
                                        onChange={ handleFecha }
                                        error={ errorFecha }
                                        helperText={ leyendaErrorFecha }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ sexoU }
                                            label="Sexo"
                                            fullWidth
                                            onChange={(e) => {
                                                setSexo(e.target.value);
                                                setUserInfo({ ...userinfo, sexo: e.target.value });
                                            }}
                                        >
                                            <MenuItem value={'Masculino'}>Masculino</MenuItem>
                                            <MenuItem value={'Femenino'}>Femenino</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo Curp obligatorio"  
                                        label="Curp"          
                                        name="curp"
                                        fullWidth
                                        onChange={handleCurp}
                                        error={errorCurp}
                                        helperText={leyendaCurp}
                                    />
                                </Grid>    
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="medium"
                                        sx={{ height: 55, width: 100}}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>                  
                            </Grid>
                        </Box>   
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};
export default Profile;