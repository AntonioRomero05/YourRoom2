import React from 'react';
import { motion } from 'framer-motion';
import { styled, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Card, Grid, Paper, Box } from '@mui/material';

const Titulo = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const Zonas = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid 
                    item
                    xs={12} 
                    sx={{mb:4}}
                >
                    <Titulo elevation={0}><h3>Zona de Recidencias</h3></Titulo>                    
                </Grid>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Item elevation={0}>
                            <Grid container spacing={5}>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto1.jpg')}
                                                    alt="Cuarto Aviacion Civil"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Aviacion Civil
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto2.jpg')}
                                                    alt="Cuarto Parque poblamiento"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Parque poblamiento
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto3.jpg')}
                                                    alt="Cuarto Centro"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Centro
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                            </Grid>                      
                        </Item>

                        <Item elevation={0}>
                            <Grid container spacing={5}>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto1.jpg')}
                                                    alt="Cuarto Aviacion Civil"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Aviacion Civil
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto5.jpg')}
                                                    alt="Cuarto Parque poblamiento"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Parque poblamiento
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item elevation={0}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={require('../assets/cuarto6.jpg')}
                                                    alt="Cuarto Centro"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Centro
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        hace 8 horas<br/>
                                                        Pequeño departamento ideal para estudiantes, cuenta con todos los servicios: Agua, luz,
                                                        internet.
                                                        Excelente ubicacion cerca del COBAEH<br/>
                                                        3 personas chicos/as
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Leer Más
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Item>
                                </Grid>
                            </Grid>                      
                        </Item>
                    </Grid>             
                </Grid>
            </Box>
        </motion.div>
    );
};

export default Zonas;