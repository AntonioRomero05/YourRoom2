import React, {useState, useEffect} from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { styled, Box, Paper, Grid, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, 
    FormControl, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import Spinner from '../pages/Spinner/Spinner';
import { db  } from '../firebase/Firebase';
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const Zonas = [
    {
        id: 1,
        zona: 'Aviacion Civil',
    },
    {
        id: 2,
        zona: 'Parque de poblamiento',
    },
    {
        id: 3,
        zona: 'Centro',
    },
    {
        id: 4,
        zona: 'Todos',
    }
]

const Inmueble = [
    {
        id: 1,
        tipo: 'Piso',
    },
    {
        id: 2,
        tipo: 'Cuarto',
    },
    {
        id: 3,
        tipo: 'Todos',
    }
]

const Compas = [
    {
        id: 1,
        compania: 'Individual',
    },
    {
        id: 2,
        compania: 'Compartido',
    }
]

const Cuartos = () => {  
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [roomsOri, setRoomsOri] = useState([]);
    const [roomsSearch, setRoomsSearch] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        setIsLoading(true)
        const q = query(collection(db, "rooms"), where("estado", "==", "Disponible"));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        setRooms(docs);
        setRoomsOri(docs);
        setIsLoading(false);
    };

    const searchZona = (value) =>{
        var resultSearch = roomsOri.filter((element) => {
            if(element.Zona === value || value === 'Todos'){
                return element;
            }
        })
        setRooms(resultSearch);
        setRoomsSearch(resultSearch);
    }

    const searchInmueble = (value) => {
        if (roomsSearch.length){
            var resultSearch = roomsSearch.filter((element) => {
                if(element.inmueble === value || value === 'Todos'){
                    return element;
                }
            })
            setRooms(resultSearch);
            setRoomsSearch(resultSearch);
        }else{
            var resultSearch = roomsOri.filter((element) => {
                if(element.inmueble === value || value === 'Todos'){
                    return element;
                }
            })
            setRooms(resultSearch);
            setRoomsSearch(resultSearch);
        }
    }

    if(isLoading){
        return <Spinner/>
    }

    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid xs={4} sx={{ mt: 7, maxWidth: 300 }}>
                        <Item>
                            <h6>Encuentra tu habitacion ideal</h6>
                            <Box my={2}>
                                <Typography component="p" sx={{mt: 2, display: 'flex'}}>
                                    Ubicación
                                </Typography>    
                                <Card>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Zonas/Localidad</InputLabel>
                                        <Select
                                            name="rol"
                                            fullwidth
                                            label="Zonas/Localidad"
                                            onChange={ (e) => { searchZona(e.target.value) } }
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {Zonas && Zonas.map((z, index) =>(
                                                <MenuItem id={z.id} value={z.zona}>{z.zona}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Card>
                                <Typography component="p" sx={{mt: 2, display: 'flex'}}>
                                    Tipo de Inmueble
                                </Typography> 
                                <Card sx={{mt: 1}}>
                                    <FormControl 
                                        sx={{ width: '100%' }} 
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Tipo de Inmueble</InputLabel>
                                        <Select
                                            name="rol"
                                            fullwidth
                                            label="Tipo de Inmueble"
                                            onChange={ (e) => { searchInmueble(e.target.value) } }
                                        >
                                        <MenuItem>Seleccione</MenuItem>
                                        {Inmueble && Inmueble.map((i, index) =>(
                                            <MenuItem id={i.id} value={i.tipo}>{i.tipo}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Card>
                                <Typography component="p" sx={{mt: 2, display: 'flex'}}>
                                    Compania
                                </Typography>                                
                                <Card sx={{mt: 1}}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Compañeros</InputLabel>
                                        <Select
                                            name="rol"
                                            fullwidth
                                            label="Compañeros"
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {Compas && Compas.map((c, index) =>(
                                                <MenuItem id={c.id} value={c.compania}>{c.compania}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Card>
                                <Typography component="p" sx={{mt: 2, display: 'flex'}}>
                                    Alquiler por Mes "$"
                                </Typography>                             
                                <TextField label="Minimo" sx={{display: 'flex',  mt: 1}} variant="filled"></TextField>
                                <TextField label="Maximo" sx={{display: 'flex', mt: 1}} variant="filled"></TextField>
                            </Box>
                        </Item>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" component="div">
                            Publicaciones Recientes
                        </Typography>
                        {rooms.slice(0, 5).map((doc, index) => {
                            const fechaOriginal = doc.fecha_publicacion;
                            const fechaArray = fechaOriginal.split("-");
                            const fechaNueva = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
                            return(
                                <Card sx={{ maxWidth: 900}}>
                                    <CardActionArea sx={{ display: 'flex' }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            image={require('../assets/cuarto1.jpg')}
                                            alt="Cuarto Aviacion Civil"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {doc.titulo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Publicado: {fechaNueva}<br/>
                                                {doc.descripcion}<br/>
                                                Capacidad: {doc.capacidad} Personas <br/>
                                                Estado: {doc.estado}
                                            </Typography>                                 
                                        </CardContent>                             
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" variant="contained" 
                                            component={RouterLink}
                                            to={'/detallecuarto/'+doc.id}>
                                            Ver habitación
                                        </Button>
                                    </CardActions>                         
                                </Card>
                            );
                        })}                                                       
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
};

export default Cuartos;