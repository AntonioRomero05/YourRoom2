import React, {useState, useRef} from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {getDocs, collection, query, where, getFirestore} from 'firebase/firestore';

import Error from '../Alert/Error';
import Success from '../Alert/Success';
import Reaptcha from 'reaptcha'; 

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RestoreIcon from '@mui/icons-material/Restore';

const theme = createTheme();

const FormResetQuestion = () => {
    const [user, setUser] = useState({
        email: "",
        question: "",
        respSecret: ""
    });

    const [questi, setQuestion] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [captchaToken, setCaptchaToken] = useState(false);
    const captchaRef = useRef(null);

    const verify = () =>{
        captchaRef.current.getResponse().then(res => {
            setCaptchaToken(true);
        })
    }

    const sendEmail = async() => {
        const auth = getAuth();
        setSuccess('Te enviamos un correo electrónico. Revisa tu correo');
        await sendPasswordResetEmail(auth, user.email);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const db = getFirestore();

        if (!user.email) return setError("Ingrese su correo electronico para restablecer su contraseña");
        if (!user.question) return setError("Seleccione la pregunta para restablecer su contraseña");
        if (!user.respSecret) return setError("Ingrese su respuesta para restablecer su contraseña");

        try {
            setError("");
            const q = query(collection(db, "usuarios"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if(doc.data().question !== user.question){
                    setSuccess("");
                    setError("Pregunta incorrecta");
                }else if(doc.data().respSecret !== user.respSecret){
                    setSuccess("");
                    setError("Respuesta incorrecta");
                }else{
                    sendEmail();
                }
            });
            
        } catch (error) {
            setSuccess("");
            setError(error.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Recuperar Contraseña
                    </Typography>
                    {error && <Error message={error} />}
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleResetPassword}>
                        {success && <Success message={success} />}
                        <TextField
                            margin="normal"      
                            autoFocus
                            title="Campo correo obligatorio"    
                            fullWidth
                            label="Correo Electronico"
                            type="email"
                            name="email"
                            id='txtEmail'
                            sx={{ mt: 1 }}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}   
                        />
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="demo-simple-select-label">Pregunta secreta</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Pregunta secreta"
                                name="question"
                                value={questi}
                                onChange={(e) => {
                                    setQuestion(e.target.value);
                                    setUser({ ...user, question: e.target.value });
                                }}
                            >
                                <MenuItem value={'amigo'}>¿Cual es el nombre de tu mejor amigo?</MenuItem>
                                <MenuItem value={'mascota'}>¿Cual es el Nombre de tu mascota?</MenuItem>
                                <MenuItem value={'apodo'}>¿Cual es tu apodo de la infancia?</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            title="Campo respuesta secreta obligatorio"  
                            fullWidth
                            autoComplete="Respuesta Secreta"                                   
                            label="Respuesta Secreta"
                            name="respSecret"
                            sx={{ mt: 1 }}
                            onChange={(e) => setUser({ ...user, respSecret: e.target.value })}
                        />
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Reaptcha
                                sitekey={process.env.REACT_APP_SITE_KEY}
                                ref={captchaRef}
                                onVerify={verify} 
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!captchaToken}
                            startIcon={<RestoreIcon/>}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default FormResetQuestion;