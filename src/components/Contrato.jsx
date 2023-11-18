import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Grid,
    Typography,
    TextField,
    CardMedia,
    Button
} from '@mui/material';
import { Download, FileUpload, Print, ArrowBack } from '@mui/icons-material';
import { NavLink as RouterLink } from 'react-router-dom';

const Contrato = () => {  
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                    <Grid item xs={16}>
                        <Box textAlign='left' paddingTop={2}>
                            <Button
                                sx={{color:'black'}}
                                startIcon={<ArrowBack/>}
                                component={RouterLink}
                                to='/miscuartos'
                            >
                                Regresar
                            </Button>
                        </Box>
                        <Typography gutterBottom variant="h6" component="div">
                            Contrato
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>

                            <Box sx={{ minHeight: 400, p:1, display: 'block', alignSelf: 'auto',border: 1}} >
                                <CardMedia
                                    component="img"
                                    height="390"
                                    sx={{ width: 320, display: 'block', alignSelf: 'auto' }}
                                    image={require('../assets/contrato1.jpg')}
                                    alt="Cuarto Individual"
                                />
                            </Box>

                            <Box sx={{p:1, display: 'block',  marginLeft: 'auto', border:1}}>

                                <Box sx={{ maxHeight: 130, m:2, p:1, 
                                    display: 'block', alignSelf: 'auto', 
                                    }}
                                >
                                    <Typography gutterBottom variant="h6" component="div">
                                        Estatus: &nbsp;&nbsp;&nbsp;&nbsp; Aceptada
                                    </Typography>
                                    <Box sx={{mt: 2, display: 'flex', alignItems: 'center'}}>
                                        <Typography variant='h6'>Subir Contrato: </Typography>
                                        <TextField type='file' sx={{marginLeft: 2}}/>
                                        <FileUpload sx={{width:40, height:40, marginLeft: 2, mt: 1}}/>
                                    </Box>
                                </Box>
                                <Box sx={{m:2, p:1, display: 'block', 
                                        border: 1, position: 'absolute', 
                                        
                                    }} 
                                >
                                    <Typography gutterBottom variant="h6" component="div">
                                        Versiones <br />
                                        v1: 26/09/2022 <br />
                                        v2: 18/11/2022
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box paddingTop={2}>
                            <Button
                                sx={{color:'black'}}
                                endIcon={<Print sx={{width: 25, height: 25}}/>}
                            >
                                Imprimir
                            </Button>
                            <Button
                                sx={{color:'black', marginLeft: 2}}
                                endIcon={<Download sx={{width: 25, height: 25}}/>}
                            >
                                Descargar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};

export default Contrato;