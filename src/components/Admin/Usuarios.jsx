import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
} from '@mui/material';

const Usuarios = () => {  
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                    <Grid item xs={12}>
                        <Card sx={{ maxWidth: 850, m:2, p:1,
                                    minWidth: {md: 850, sm: 200},
                                }}>
                            <CardActionArea sx={{ display: {sm: 'flex', xs: 'block'}, 
                                                justifyContent: {sm: 'flex-start'}, 
                                                alignItems: 'center' 
                                            }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    sx={{ width: 140, display: 'block', alignSelf: 'auto' }}
                                    image={require('../../assets/user1.png')}
                                    alt="Usuario"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Rodrigo Martinez Hernandez
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tipo de Usuario: <b>Arrendatario</b><br/> <br />
                                    </Typography>
                                </CardContent>                             
                            </CardActionArea>            
                        </Card>
                        <Card sx={{ maxWidth: 850, m:2, p:1,
                                    minWidth: {md: 850, sm: 200},
                                }}>
                            <CardActionArea sx={{ display: {sm: 'flex', xs: 'block'}, 
                                                justifyContent: {sm: 'flex-start'}, 
                                                alignItems: 'center' 
                                                }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    sx={{ width: 140, display: 'block', alignSelf: 'auto' }}
                                    image={require('../../assets/user2.png')}
                                    alt="Usuario"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Jesus David Hernandez Hernandez
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tipo de Usuario: <b>Arrendatario</b><br/> <br />
                                    </Typography>
                                </CardContent>                             
                            </CardActionArea>            
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Usuarios;