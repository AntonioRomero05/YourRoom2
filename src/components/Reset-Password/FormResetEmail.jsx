import React, {useState, useRef} from 'react';
import { useAuth } from "../../context/authContext";
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
import RestoreIcon from '@mui/icons-material/Restore';

const theme = createTheme();

const FormResetEmail = () => {
    const [user, setUser] = useState({
        email: ""
    });
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [captchaToken, setCaptchaToken] = useState(false);
    const captchaRef = useRef(null);

    const verify = () =>{
        captchaRef.current.getResponse().then(res => {
            setCaptchaToken(true);
        })
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Ingrese su correo electronico para restablecer su contraseña");
        try {
            await resetPassword(user.email);
            setSuccess('Te enviamos un correo electrónico. Revisa tu correo');
            setError("");
        } catch (error) {
            if(error.code === "auth/user-not-found"){
                setError('El correo que ingresaste no existe');
                setSuccess("");
            }
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
                        Recuperacion por correo electronico
                    </Typography>
                    {error && <Error message={error} />}
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleResetPassword}>
                        {success && <Success message={success} />}
                        <TextField
                            margin="normal"      
                            required
                            autoFocus
                            title="Campo correo obligatorio"    
                            fullWidth
                            label="Correo Electronico"
                            type="email"
                            name="email"
                            id='txtEmail'
                            onChange={(e) => setUser({ ...user, email: e.target.value })}   
                        />
                        <Grid item xs={12}>
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

export default FormResetEmail;