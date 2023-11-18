import React, {useState, useRef} from 'react';
import { useAuth } from "../../../context/authContext";
import { db } from '../../../firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import Reaptcha from 'reaptcha';
import curp from 'curp';
import RfcFacil from 'rfc-facil';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from '@mui/icons-material';
import Validate from '../ClassValidate';

import classValidateForm from '../validateForm';
import Ventana from '../Ventana';
import Error from '../../Alert/Error';

const theme = createTheme();

const FormRegister = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [captchaToken, setCaptchaToken] = useState(false);
    const captchaRef = useRef(null);
    const [sexoU, setSexo] = useState('');
    const [rfcCreado, setRfc] = useState('');
    // Manejo de errores en entra de datos
    const [errorName, setErrorName] = useState(false);
    const [leyendaName, setLeyendaName] = useState('');

    const [errorAPaterno, setErrorAPaterno] = useState(false);
    const [leyendaAPaterno, setLeyendaAPaterno] = useState('');
    const [errorAMaterno, setErrorAMaterno] = useState(false);
    const [leyendaAMaterno, setLeyendaAMaterno] = useState('');

    const [errorPassword, setErrorPassword] = useState(false);
    const [leyendaPass, setLeyendaPass] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const [leyendaConfirmPass, setLeyendaConfirmPass] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [leyendaEmail, setLeyendaEmail] = useState('');
    const [errorConfirmEmail, setErrorConfirmEmail] = useState(false);
    const [leyendaConfirmEmail, setLeyendaConfirmEmail] = useState('');

    const [errorCurp, seterrorCurp] = useState(false);
    const [leyendaCurp, setleyendaCurp] = useState('');
    const [errorFecha, setErrorFecha] = useState(false);
    const [leyendaErrorFecha, setLeyendaErrorFecha] = useState('');

    const [user, setUser] = useState({
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
        question: "",
        respSecret: "",
        rol: "Arrendador",
    });
    const verify = () =>{
        captchaRef.current.getResponse().then(res => {
            setCaptchaToken(true);
        })
    }
    const handleName =(e) => {
        var regex = /^[a-zA-ZÀ-ÿ ]+$/;
        if(regex.test(e.target.value)){
            setUser({ ...user, nombre: e.target.value });
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
                setUser({ ...user, apellidoP: e.target.value });
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
                setUser({ ...user, apellidoM: e.target.value });
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
            setUser({ ...user, nacimiento: fechaN });
        }else {
            setErrorFecha(true);
            setLeyendaErrorFecha('Fecha de nacimiento invalida, usted debe tener mas de 15 años pero no mas de 60');
        }
    }

    const handlePassword = (e) => {
        const hasValidLength = /^.{8,}$/;
        const hasLowerAndUpperLetters = /(?=.*[a-z])(?=.*[A-Z])/;
        const hasNumbers = /(?=.*\d)/;
        const hasSpecialChars = /(?=.*[@$!%*?&])/;
        if(hasValidLength.test(e.target.value)){
            if(hasLowerAndUpperLetters.test(e.target.value)){
                if(hasNumbers.test(e.target.value)){
                    if(hasSpecialChars.test(e.target.value)){
                        setLeyendaPass('')
                        setErrorPassword(false);
                        setUser({ ...user, password: e.target.value })
                    }else{
                        setLeyendaPass('La Contraseña debe tener caracteres especiales como ?*=.@')
                        setErrorPassword(true);
                    }
                }else{
                    setLeyendaPass('La Contraseña debe tener numeros')
                    setErrorPassword(true);
                }
            }else{
                setLeyendaPass('La Contraseña debe tener letras mayusculas y minusculas')
                setErrorPassword(true);
            }
        }else{
            setLeyendaPass('La Contraseña debe ser mayor a 8 dígitos')
            setErrorPassword(true);
        }
    }

    const handleConfirmPassword = (e) => {
        if(user.password === e.target.value){
            setLeyendaConfirmPass('La Contraseña coincide')
            setErrorConfirmPassword(false);
        }else{
            setLeyendaConfirmPass('La Contraseña no coincide')
            setErrorConfirmPassword(true);
        }
    }

    const handleEmail = (e) => {
        const validEmail = classValidateForm.isValidEmail(e.target.value);
        if(validEmail === true){
            setLeyendaEmail('')
            setErrorEmail(false);
            setUser({ ...user, email: e.target.value })
        }else{
            setLeyendaEmail('El correo electronico es invalido')
            setErrorEmail(true);
        }
    }

    const handleConfirmEmail = (e) => {
        if(user.email === e.target.value){
            setLeyendaConfirmEmail('El correo electronico coincide')
            setErrorConfirmEmail(false);
            const dayF = user.nacimiento.split('-');
            const rfc = RfcFacil.forNaturalPerson({
                name: user.nombre,
                firstLastName: user.apellidoP,
                secondLastName: user.apellidoM,
                day: dayF[2],
                month: dayF[1],
                year: dayF[0]
            });
            setRfc(rfc);
            setUser({ ...user, rfc: rfc });
        }else{
            setLeyendaConfirmEmail('El correo electronico no coincide')
            setErrorConfirmEmail(true);
        }
    }
    
    const handleCurp =(e)=> {
        if(curp.validar(e.target.value) === null){
            setleyendaCurp('La CURP no es valida');
            seterrorCurp(true);
        }else{
            setUser({ ...user, curp: e.target.value.toUpperCase() });
            console.log(user.curp);
            setleyendaCurp('CURP Valida');
            seterrorCurp(false);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if(errorAPaterno){
                setError('El apellido paterno ingresado no es valido');
                throw Object.assign( new Error('apellidoP'), { code: 402 });
            }
            if(errorAMaterno){
                setError('El apellido materno ingresado no es valido');
                throw Object.assign( new Error('apellidoM'), { code: 402 });
            }
            if(errorCurp){
                setError('La CURP ingresada no es valida');
                throw Object.assign( new Error('curp'), { code: 402 });
            }
            if(user.nacimiento === null || user.nacimiento === ''){
                setError('Selecciona una fecha de nacimiento');
                throw Object.assign( new Error('fechaNac'), { code: 402 });
            }
            if(errorEmail){
                setError('Correco electronico invalido');
                throw Object.assign( new Error('email'), { code: 402 });
            }
            if(errorConfirmEmail){
                setError('Confirme Su Correo Electronico');
                throw Object.assign( new Error('emailConfirm'), { code: 402 });
            }
            if(errorPassword){
                setError('Confirme La Contraseña');
                throw Object.assign( new Error('password'), { code: 402 });
            }
            const userInfo = await signup(user.email, user.password);
            const docRef = doc(db, `usuarios/${userInfo.user.uid}`);
            setDoc(docRef, {
                nombre: user.nombre, 
                apellidoP: user.apellidoP, 
                apellidoM: user.apellidoM, 
                codPostal: user.codPostal,
                telefono: user.telefono,
                nacimiento: user.nacimiento,
                sexo: user.sexo,
                curp: user.curp,
                rfc: user.rfc,
                email: user.email,
                question: user.question, 
                respSecret: user.respSecret,
                rol: user.rol});
            navigate("/planes");
        } catch (error) {
            console.log(error.code);
            if(error.code === "auth/internal-error"){
                setError('Correo electronico invalido');
            }
            if(error.code === "auth/invalid-email"){
                setError('Correo electronico invalido');
            }
            if(error.code === "auth/weak-password"){
                setError('La contraseña debe ser mayor a 6 caracteres');
            }  
            if(error.code === "auth/email-already-in-use"){
                setError('Correo Electronico ya existente');
            }
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarme como Arrendador
                    </Typography>
                    {error && <Error message={error} />}
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo nombre obligatorio"  
                                    fullWidth
                                    label="Nombre"
                                    name="txtName"
                                    id="txtName"
                                    error={errorName}
                                    helperText={leyendaName}
                                    onChange={handleName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo apellido Paterno obligatorio"  
                                    fullWidth
                                    autoComplete="Apellido paterno"                                   
                                    label="Apellido Paterno"
                                    name="txtAPaterno"
                                    id="txtAPaterno"
                                    onChange={ handleAPaterno }
                                    error={ errorAPaterno }
                                    helperText={ leyendaAPaterno }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo apellido Materno obligatorio"  
                                    fullWidth
                                    label="Apellido Materno"
                                    name="txtAMaterno"
                                    id="txtAMaterno"
                                    onChange={ handleAMaterno }
                                    error={ errorAMaterno }
                                    helperText={ leyendaAMaterno }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Codigo Postal obligatorio"  
                                    fullWidth
                                    label="Codigo postal"
                                    name="codPostal"
                                    id="codPostal"
                                    onChange={(e)=> setUser({ ...user, codPostal: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Telefono obligatorio"  
                                    fullWidth
                                    label="Telefono"
                                    name='txtTelefono'
                                    id="txtTelefono"
                                    onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Fecha de nacimiento obligatorio"  
                                    fullWidth
                                    id="date"
                                    label="Fecha De Nacimiento"
                                    type="date"
                                    defaultValue="2002-01-05"
                                    sx={{ width: 267}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name='nacimiento'
                                    onChange={ handleFecha }
                                    error={ errorFecha }
                                    helperText={ leyendaErrorFecha }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="txtSexo"
                                        value={ sexoU }
                                        label="Sexo"
                                        onChange={(e) => {
                                            setSexo(e.target.value);
                                            setUser({ ...user, sexo: e.target.value });
                                        }}
                                    >
                                        <MenuItem value={'Masculino'}>Masculino</MenuItem>
                                        <MenuItem value={'Femenino'}>Femenino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Curp obligatorio"  
                                    fullWidth
                                    label="Curp"          
                                    name="txtCurp"
                                    id="txtCurp"
                                    onChange={handleCurp}
                                    error={errorCurp}
                                    helperText={leyendaCurp}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo RFC obligatorio"  
                                    fullWidth
                                    label="RFC"      
                                    name="rfc"
                                    id="txtRfc"
                                    value={rfcCreado}
                                    disabled
                                />
                            </Grid>                          
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Correo Electronico obligatorio"  
                                    fullWidth
                                    label="Correo Electronico"
                                    id="txtEmail"
                                    name="txtEmail"
                                    onChange={handleEmail}
                                    error={errorEmail}
                                    helperText={leyendaEmail}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo Confirmar Correo Electronico obligatorio"  
                                    fullWidth
                                    label="Confirmar Correo Electronico"
                                    id="txtConfirmEmail"
                                    name="txtConfirmEmail"
                                    onChange={handleConfirmEmail}
                                    error={errorConfirmEmail}
                                    helperText={leyendaConfirmEmail}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo contraseña obligatorio"  
                                    fullWidth
                                    label="Contraseña"
                                    type="password"
                                    id="txtPassword"
                                    name="txtPassword"
                                    onChange={handlePassword}
                                    error={errorPassword}
                                    helperText={leyendaPass}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo confirmar contraseña obligatorio" 
                                    fullWidth
                                    name="txtConfirmPass"
                                    id="txtConfirmPass"
                                    label="Confirmar contraseña"
                                    type="password"
                                    autoComplete="Comfirmar contraseña"
                                    onChange={handleConfirmPassword}
                                    error={errorConfirmPassword}
                                    helperText={leyendaConfirmPass}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="p" variant="p">
                                    Pregunta secreta para la recuperar contraseña:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Pregunta secreta</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="txtPregunta"
                                        label="Pregunta secreta"
                                        onChange={(e) => setUser({ ...user, question: e.target.value })}
                                    >
                                        <MenuItem value={'amigo'}>¿Cual es el nombre de tu mejor amigo?</MenuItem>
                                        <MenuItem value={'mascota'}>¿Cual es el Nombre de tu mascota?</MenuItem>
                                        <MenuItem value={'apodo'}>¿Cual es tu apodo de la infancia?</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    autoFocus
                                    title="Campo respuesta secreta obligatorio"  
                                    fullWidth
                                    autoComplete="Respuesta Secreta"                                   
                                    label="Respuesta Secreta"
                                    name="txtRespSecret"
                                    id="txtRespSecret"
                                    onChange={(e) => setUser({ ...user, respSecret: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Checkbox edge='start' disableRipple/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Ventana/>     
                                    </ListItemText>
                                </ListItemButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Reaptcha
                                    sitekey={process.env.REACT_APP_SITE_KEY}
                                    ref={captchaRef}
                                    onVerify={verify} 
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            id='register-button'
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={<Login/>}
                            disabled={!captchaToken}
                        >
                            ACCEDER
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/iniciarsesion">
                                Ya tienes cuenta? Haz clic aqui
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default FormRegister;