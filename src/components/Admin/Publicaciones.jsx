import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';


function Publicaciones() {
    return (                  
        <Card sx={{ minWidth: {md: 850, sm: 200}, mt: 2, p: 1 }}>                       
            <CardContent sx={{ display: {sm: 'flex', xs: 'block'}, 
                                justifyContent: {sm: 'flex-start'}, 
                                alignItems: 'center' 
            }}>
                <CardMedia
                    component="img"
                    height="140"
                    sx={{ width: {md: 369, sm: 'auto'}, display: 'block', alignSelf: 'auto'  }}
                    image={require('../../assets/cuarto3.jpg')}
                    alt="Cuarto Aviacion Civil"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Cuarto Individual
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ubicacion: Parque de Poblamiento<br/>
                        Precio: $800 <br/>
                        Arrendador: Martino Perez Lopez <br/> 
                        Fecha de publicacion: 15/09/2022
                    </Typography>
                </CardContent>
                <Box sx={{display: 'flex', marginLeft: 'auto', flexDirection: 'column'}}>
                    <Button sx={{color:'green', m: 1}}
                    startIcon={<CheckCircle/>}>
                        Aceptar
                    </Button>
                    <Button sx={{color:'red', m:1}}
                    startIcon={<Cancel/>}>
                        Rechazar
                    </Button>
                </Box>      
            </CardContent>
        </Card>
    );
}

export default Publicaciones