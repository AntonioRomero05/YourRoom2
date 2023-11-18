import React from 'react';
import {Container, Box, Grid, Link, IconButton} from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
    NavLink as RouterLink
} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
                <Box 
                    sx={{ mt: 5 }}
                    px={{xs: 3, sm: 10}}
                    py={{xs: 3, sm: 3}}              
                    bgcolor="text.secondary" 
                    backgroundColor="primary.dark"
                    color="white"
                >
                    <Container maxWidth="lg">
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Ayuda</Box>
                                <Box>
                                    <Link 
                                        color='inherit' 
                                        underline='none' 
                                        component={RouterLink} 
                                        to='/contacto' 
                                    >
                                        Contacto
                                    </Link>                        
                                </Box>
                                <Box>
                                    <Link 
                                        color='inherit' 
                                        underline='none'
                                        component={RouterLink} 
                                        to='/soporte'
                                    >
                                        Soporte
                                    </Link>
                                </Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/avisolegal'
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Aviso legal
                                    </Link>
                                </Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/politica'
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Politica de Privacidad
                                    </Link>
                                </Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/cookies' 
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Politica de cookies
                                    </Link>
                                </Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/preguntas' 
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Preguntas Frecuentes
                                    </Link>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1}>Cuenta</Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/iniciarsesion' 
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Iniciar Sesion
                                    </Link>
                                </Box>
                                <Box>
                                    <Link 
                                        component={RouterLink} 
                                        to='/cuenta' 
                                        color='inherit' 
                                        underline='none'
                                    >
                                        Registrarme
                                    </Link>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <Box borderBottom={1} >Descarga gratis nuestra aplicación</Box>
                                <Box>
                                    Proximamente...
                                </Box>                           
                            </Grid>
                        </Grid>
                        <Box 
                            textAlign="center" 
                            pt={{xs: 5, sm: 4}} 
                            pb={{xs: 5, sm: 0}}
                        >
                            <IconButton color="inherit" aria-label="menu">
                                <FacebookIcon color="dark"/>
                            </IconButton>
                            <IconButton color="inherit" aria-label="menu">
                                <TwitterIcon color="dark"/>
                            </IconButton>
                            <IconButton color="inherit" aria-label="menu">
                                <InstagramIcon color="dark"/>
                            </IconButton>
                            <Box sx={{mt: 1}}>
                                &reg; {new Date().getFullYear()} Your Room. Todos los derechos reservados
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </footer>
    );
};

export default Footer;