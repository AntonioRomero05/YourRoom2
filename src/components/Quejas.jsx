import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Grid,
    TextField,
    TextareaAutosize,
    Typography,
    Button,
    Stack,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material';
import { NavLink as RouterLink } from 'react-router-dom';

const Quejas = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box xs={{ flexGrow: 1 }}>
                <Grid columns={16}>
                    <Box textAlign='left' paddingTop={2}>
                        <Button
                            sx={{color:'black'}}
                            startIcon={<ArrowBack/>}
                            component={RouterLink}
                            to='/perfil/evaluacion'
                        >
                            Regresar
                        </Button>
                    </Box>
                    <Grid item xs={16} sx={{ maxWidth: 300, mt:2 }}>
                        <Typography variant='h6' component='div'>
                            Quejas y Sugerencias
                        </Typography>   
                    </Grid>              
                    <Grid item xs={16} sx={{ mt: 2,maxWidth: 300 }}>
                        <Typography component="div" sx={{mt: 2, display: 'flex'}}>
                            Motivo
                        </Typography> 
                        <TextField label="Motivo de su queja" sx={{display: 'flex',  mt: 1}} variant="filled"></TextField>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography component="div" sx={{mt: 2, display: 'flex'}}>
                            Descripcion
                        </Typography> 
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={6}
                            style={{ width: 750 }}
                        />
                    </Grid>
                    <Grid item xs={16} sx={{ mt: 2, alignItems: 'right' }}>
                        <Stack direction="row">
                            <Button variant="contained" color="error" sx={{mr: 1}}
                                component={RouterLink}
                                to='/perfil/evaluacion'
                            >
                                Cancelar
                            </Button>
                            <Button variant="contained" color="success"
                                component={RouterLink}
                                to='/perfil/evaluacion'
                            >
                                Enviar
                            </Button>
                        </Stack>    
                    </Grid>
                </Grid>
            </Box> 
        </motion.div>
        
    );
};

export default Quejas;