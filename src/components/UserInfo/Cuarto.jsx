import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Grid
} from '@mui/material';
import { db } from '../../firebase/Firebase';
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import RoomDataService from '../Cuartos/room.servicies'
import Spinner from '../../pages/Spinner/Spinner';

function Cuarto() {
    const [userRooms, setUserRooms] = useState([]);
    const [arrenInfo, setArrenInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        setIsLoading(true);
        const q = query(collection(db, "rooms"),
            where("id_usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        if (docs.length) {
            setUserRooms(docs);
            await getInfo();
        }
        setIsLoading(false);
    };
    const getUser = async (id) => {
        const docSnapUser = await RoomDataService.getUser(id);
        return docSnapUser;
    };

    const getInfo = async () => {
        const arren = [];
        for (const doc of userRooms) {
            // Obtener datos del arrendatario de acuerdo a la cita
            const docSnapArren = await getUser(doc.id_arrendador);
            arren.push({ id: docSnapArren.id, ...docSnapArren.data() });
        }
        await setArrenInfo(arren);
    };

    
    useEffect(() => {
        getInfo();
    }, [userRooms]);

    if(isLoading) return <Spinner/>

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16} alignItems='center' justifyContent={'center'}>
                <Grid item xs={14}>
                    <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                            Mi Cuarto
                    </Typography>
                    {
                        !userRooms ? (
                            <>
                                <Typography gutterBottom variant="p" component="div" textAlign={'center'} >
                                    Aun no tienes cuartos
                                </Typography>
                            </>
                        ) : (
                            <>
                                {
                                    userRooms.filter(docRoom => {
                                        const arren = arrenInfo.find(docArren => docArren.id === docRoom.id_arrendador);
                                        return arren;
                                    }).map((docRoom) => {
                                        const arren = arrenInfo.find(docArren => docArren.id === docRoom.id_arrendador);
                                        return (
                                            <Card sx={{ maxWidth: 850, mt: 1, p: 1 }}>
                                                <Box sx={{
                                                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                                                    flexDirection: { md: 'row', sm: 'column', xs: 'column' }
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        sx={{ width: 120, display: 'block', alignSelf: 'auto' }}
                                                        image={require('../../assets/cuarto2.jpg')}
                                                        alt="Cuarto Individual"
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <b>Direccion: </b> {docRoom.direccion} <br />
                                                            <b>Referencia: </b> {docRoom.referencia} <br />
                                                            <b>Precio: </b> $ {docRoom.precio} <br />
                                                            <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                                            <b>Fecha Entrada: </b> {docRoom.fecha_entrada} <br />
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        );
                                    })
                                }
                            </>
                        )
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Cuarto