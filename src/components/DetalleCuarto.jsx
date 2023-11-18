import React, { useEffect, useState } from 'react'
import {
    Box,
    Grid,
    Typography,
    Button,
    CardMedia,
    CardActionArea,
    Snackbar,
    Alert
} from '@mui/material';
import { Bed, Person, AttachMoney, WhatsApp, Room, ArrowBack } from '@mui/icons-material';
import { NavLink as RouterLink, useParams } from 'react-router-dom';
import FormCita from './FormCita';
import { useAuth } from '../context/authContext';
import RoomDataService from './Cuartos/room.servicies'
import Spinner from '../pages/Spinner/Spinner';

const DetalleCuarto = () => {
    const { roomId } = useParams();
    const [imgUrl, setImgUrl] = useState('imagen1');
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [room, setRoom] = useState([]);
    const [arrendador, setArrendador] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!user){
            setOpen(true);
        }
        const fetchData = async () => {
            setIsLoading(true);
            const docSnap = await RoomDataService.getRoom(roomId);
            setRoom({...docSnap.data(), id: docSnap.id});
            setIsLoading(false);
        }
        fetchData();
    }, [roomId, user]);
    
    useEffect(() => {
        const getArrendador = async () => {
            if (room) {
                const idArr = room.id_arrendador;
                const docArr = await RoomDataService.getUser(idArr);
                setArrendador(docArr.data());
            }
        }
        getArrendador();
    }, [room]);

    if(isLoading){
        return <Spinner/>
    }

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                <Grid item xs={14}>
                    <Box textAlign='left' paddingTop={2}>
                        <Button
                            sx={{color:'black'}}
                            startIcon={<ArrowBack/>}
                            component={RouterLink}
                            to='/cuartos'
                        >
                            Regresar
                        </Button>
                    </Box>
                    <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
                        Detalles del cuarto
                    </Typography>
                    <Snackbar
                        open={open}
                        autoHideDuration={5000} // Duración en ms que se muestra la notificación
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%', backgroundColor: '#2193F3', color: 'white'  }}>
                            Para Agendar Una Cita Debe Iniciar Sesion
                        </Alert>
                    </Snackbar>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', mt: 1, p: 1,
                        flexDirection:{md: 'row',sm: 'column', xs: 'column'}
                    }}>
                        <Box sx={{display: 'flex', p:1}}>
                            <Box sx={{ minWidth: 60, maxWidth: 100, p:1, display: 'flex',
                                alignSelf: 'auto',
                                justifyContent: 'flex-start', alignItems: 'center' }}
                            >
                                <Box>
                                    <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onClick = {()=>setImgUrl('imagen1')}
                                        >
                                        <CardMedia
                                            component="img"
                                            height="60"
                                            sx={{ width: 60, display: 'block', alignSelf: 'auto', mt: 1  }}
                                            image={require('../assets/imagen1.jpg')}
                                            alt="imagen1"
                                        />
                                    </CardActionArea>
                                    <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onClick = {()=>setImgUrl('imagen2')}
                                        >
                                        <CardMedia
                                            component="img"
                                            height="60"
                                            sx={{ width: 60, display: 'block', alignSelf: 'auto', mt:1  }}
                                            image={require('../assets/imagen2.jpg')}
                                            alt="imagen1"
                                        />
                                    </CardActionArea>
                                    <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onClick = {()=>setImgUrl('imagen3')}
                                        >
                                        <CardMedia
                                            component="img"
                                            height="60"
                                            sx={{ width: 60, display: 'block', alignSelf: 'auto', mt:1  }}
                                            image={require('../assets/imagen3.jpg')}
                                            alt="imagen1"
                                        />
                                    </CardActionArea>
                                    <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onClick = {()=>setImgUrl('imagen4')}
                                        >
                                        <CardMedia
                                            component="img"
                                            height="60"
                                            sx={{ width: 60, display: 'block', alignSelf: 'auto', mt:1  }}
                                            image={require('../assets/imagen4.jpg')}
                                            alt="imagen1"
                                        />
                                    </CardActionArea>
                                    <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                        onClick = {()=>setImgUrl('imagen5')}
                                        >
                                        <CardMedia
                                            component="img"
                                            height="60"
                                            sx={{ width: 60, display: 'block', alignSelf: 'auto', mt:1  }}
                                            image={require('../assets/imagen5.jpg')}
                                            alt="imagen1"
                                        />
                                    </CardActionArea>
                                </Box>
                            </Box>
                            <Box sx={{ minWidth: 330, p:1, display: 'flex', 
                                alignSelf: 'auto', marginLeft: 'auto',
                                justifyContent: 'flex-start', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    sx={{ maxWidth: 410, display: 'block', alignSelf: 'auto'  }}
                                    image={require('../assets/'+ imgUrl +'.jpg')}
                                    alt="Foto 1"
                                />  
                            </Box>
                        </Box>
                        <Box sx={{ minWidth: 330, p:1, display: 'block', 
                                    alignSelf: 'auto', marginLeft: 'auto'}} >
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                Cuarto en Renta
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ textAlign: 'center', mb: 2, color: '#747474'}}>
                                Detalles generales
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                {room.titulo} <br /> <br />
                                Publicado: {room.fecha_publicacion} <br /> <br />
                                <AttachMoney/> {room.precio} / Mes <br /> <br />
                                <Bed/> Recámara(s): {room.capacidad} <br /> <br />
                                <Person/> Arrendador(a): {arrendador.nombre} {arrendador.apellidoP} {arrendador.apellidoM}<br /> <br />
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'center', mb: 3, textAlign: 'flex-end'}}>
                                <Button size='medium' variant="contained" sx={{background: 'green'}}
                                    disabled={!user}
                                >
                                    <FormCita room={room}/>
                                </Button>
                                <Button size='medium' variant="contained" sx={{background: 'green', ml: 'auto'}} startIcon={<WhatsApp/>}>
                                    WhatsApp
                                </Button>
                            </Box>
                            <Grid xs={8} sx={{ mt: 2, maxWidth: 300, textAlign: 'center' }}>
                                <RouterLink to="#">
                                    Reglamento
                                </RouterLink>           
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={14}>
                <Box sx={{display: 'flex', justifyContent: 'flex-start', p: 2}}>
                        <Box sx={{ minWidth: {md: 300, sm: 200, xs: 200}, minHeight: {sm: 500, xs: 500}, p:1, display: 'flex', 
                            alignSelf: 'auto', flexDirection: 'column',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                <Room/>Ubicación
                            </Typography>
                            <Typography gutterBottom variant="body" color='initial'>
                                {room.direccion}<br />
                                {room.referencia}
                            </Typography>
                            <CardMedia
                                component="img"
                                height="300"
                                sx={{ maxWidth: 500, display: 'block', alignSelf: 'auto'  }}
                                image={require('../assets/ubicacion1.png')}
                                alt="Foto 1"
                            />  
                        </Box>
                        <Box sx={{ maxWidth: 330, p:1, display: 'block',alignSelf: 'auto', marginLeft: 'auto'}} 
                            height={'auto'}>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                Descripcion
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                {room.descripcion}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                Servicios
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                {room.servicios}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center'}}>
                                Baño
                            </Typography>
                            <Typography variant="body2" color="initial" sx={{ml: 2}}>
                                {room.baño}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default DetalleCuarto