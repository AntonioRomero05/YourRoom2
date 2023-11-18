import React from 'react';
import { motion } from 'framer-motion';
import {
    styled,
    Paper,
    CardMedia,
    Box,
    Grid,
    TextareaAutosize,
    Typography,
    Slider,
    Button
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { Description, MarkChatRead } from '@mui/icons-material';

const Titulo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const Evaluacion = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box xs={{ flexGrow: 1 }} sx={{alignContent: 'center'}}>
                <Grid>
                    <Titulo elevation={0}><h3>Tu Cuarto</h3></Titulo>                    
                </Grid>
                <Box textAlign='right' paddingTop={2}>
                    <Button
                        sx={{color:'black'}}
                        startIcon={<MarkChatRead/>}
                        component={RouterLink}
                        to='/perfil/quejas'
                    >
                        Quejas
                    </Button>
                    <Button
                        sx={{color:'black', marginLeft: 2}}
                        startIcon={<Description/>}
                        component={RouterLink}
                        to='/perfil/miscuartos/contrato'
                    >
                        Contrato
                    </Button>
                </Box>
                <Grid columns={16} container spacing={2}>            
                    <Grid item xs={6}>
                        <Grid>
                            <Grid>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={require('../assets/cuarto1.jpg')}
                                    alt="Cuarto Aviacion Civil"
                                />
                            </Grid>
                            <Grid sx={{mt: 2}}>
                                <Typography component={'div'} variant="body2">
                                    <b>Ubicación</b><br/>
                                    Charco Azul municipio de Huejutla Hgo.<br/>
                                    Calle Vicente Gerrero
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={require('../assets/ubicacion1.png')}
                                    alt="Cuarto Aviacion Civil"
                                />
                            </Grid>
                        </Grid>                
                    </Grid>
                    <Grid item xs={10}>
                        <Typography component={'div'} variant="body2">
                            <Typography component="div" sx={{mt: 2}}>
                                <b>Renta: </b>$2000/mes<br/>
                                <b>Compartido: </b>2 personas<br/>
                                <b>Arrendador: </b>Roberto Martínez Gomez<br/>
                                <b>Periodo: </b>Pagado<br/>
                                <b>Fecha Ocupación: </b>06/09/2022<br/>
                                <b>Proximo pago: </b>06/11/2022<br/> 
                            </Typography>                                    
                            <Box>
                                <Grid>
                                    <Typography component="div" sx={{mt: 2, display: 'flex'}}>
                                        <b>Evaluar</b>
                                    </Typography> 
                                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" style={{ width: 400 }}/>
                                </Grid>
                                <Grid>
                                    <Typography component="div" sx={{mt: 2, display: 'flex'}}>
                                        <b>Comentario</b>
                                    </Typography> 
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={4}
                                        style={{ width: 400 }}
                                    />
                                    <br/>
                                    <Button variant="contained" color="primary">
                                        Enviar
                                    </Button>
                                </Grid>
                            </Box>                 
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
        
    );
};

export default Evaluacion;