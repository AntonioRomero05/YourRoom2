import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Grid,
    Typography,
    Button
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const tipoCuenta = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
                            Tipo de Cuenta
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', mt: 2, p:5}}>
                            <Box sx={{ minWidth: 330, p:1, display: 'flex', alignSelf: 'auto', flexDirection: 'column' ,border: 1}} >
                                <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
                                    Arrendatario
                                </Typography>
                                <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                    Buscas rentar cuartos
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'center', height: '46%',mb: 3, alignItems: 'flex-end'}}>
                                    <Button size='medium' variant="contained" sx={{display: 'block', alignSelf: 'auto'}}
                                        component={RouterLink} to='/cuenta/arrendatario'
                                    >
                                        Seleccionar
                                    </Button>
                                </Box>           
                            </Box>
                            <Box sx={{ minWidth: 330, p:1, display: 'block', alignSelf: 'auto', marginLeft: 'auto',border: 1}} >
                                <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                    Arrendador
                                </Typography>
                                <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                    Buscas ofrecer tus cuartos
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'center', mb: 3, textAlign: 'flex-end'}}>
                                    <Button size='medium' variant="contained" component={RouterLink} to='/cuenta/arrendador'>
                                        Seleccionar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};

export default tipoCuenta;