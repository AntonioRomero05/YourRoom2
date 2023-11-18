import React, {useEffect, useState} from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, CardActionArea, 
    CardActions, IconButton, } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import classRoom from './room.servicies';
import Spinner from '../../pages/Spinner/Spinner'

const Cuartos = ({getRoomId, user}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        getRooms();
    }, [])

    const getRooms = async() => {
        setIsLoading(true)
        const data = await classRoom.getAllRooms(user);
        setRooms(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setIsLoading(false);
    }

    if(isLoading){
        return <Spinner/>
    }

    const deleteHandler = async(id) => {
        await classRoom.deleteRoom(id);
        getRooms();
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={getRooms}
            >
                Refrescar
            </Button>
            {rooms.map((doc) => {
                return (                  
                    <Card sx={{ maxWidth: 850, mt: 2, p: 1 }} key={doc.id}>                       
                        <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <CardMedia
                                component="img"
                                height="160"
                                sx={{ width: 369, display: 'block' }}
                                image={doc.urlimagen}
                                alt={doc.titulo}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {doc.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dirección: {doc.direccion}<br/>
                                    Precio: {doc.precioRenta}<br/>
                                    Tipo de inmueble: {doc.tipoInmueble} <br/> 
                                    Semiamueblado: {doc.semiamueblado === '1' ? "Si": "No"}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Box marginLeft={'auto'}>
                                <IconButton 
                                    aria-label="Editar" 
                                    sx={{mr:1}} 
                                    onClick={ (e) => getRoomId(doc.id)}
                                >
                                    <Edit sx={{width: 25, height: 25, color: '#1976d2'}}/>
                                </IconButton>
                                <IconButton 
                                    aria-label="Eliminar" 
                                    sx={{mr:1}}
                                    onClick={ (e) => deleteHandler(doc.id)}
                                >
                                    <Delete sx={{width: 25, height: 25, color: '#d32f2f'}}/>
                                </IconButton>
                            </Box>
                        </CardActions>
                    </Card>
                );
            })}          
        </>
    );
};

export default Cuartos;