import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    Typography,
    Button,
    CardContent
} from '@mui/material';
import { db } from '../../firebase/Firebase';
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import { Cancel } from '@mui/icons-material';
import Spinner from '../../pages/Spinner/Spinner';
import { useAuth } from '../../context/authContext';
import RoomDataService from '../Cuartos/room.servicies'

const CitasUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [userCitas, setUserCitas] = useState([]);
    const [userCitasPen, setUserCitasPen] = useState([]);
    const [userCitasAcep, setUserCitasAcep] = useState([]);
    const [userCitasCan, setUserCitasCan] = useState([]);
    const [userCitasFin, setUserCitasFin] = useState([]);
    const [roomPen, setRoomPen] = useState([]);
    const [roomAcep, setRoomAcep] = useState([]);
    const [roomCan, setRoomCan] = useState([]);
    const [roomFin, setRoomFin] = useState([]);
    const [arrenPen, setArrenPen] = useState([]);
    const [arrenAcep, setArrenAcep] = useState([]);
    const [arrenCan, setArrenCan] = useState([]);
    const [arrenFin, setArrenFin] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getData();
    }, [flag]);

    const getData = async () => {
        setIsLoading(true);
        const q = query(collection(db, "citas"), where("id_usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        if (docs.length) {
            setUserCitas(docs);
            sepCitas();
        }
        setIsLoading(false);
    };

    const getRoom = async (id) => {
        const docSnapRoom = await RoomDataService.getRoom(id);
        return docSnapRoom;
    };

    const getUser = async (id) => {
        const docSnapUser = await RoomDataService.getUser(id);
        return docSnapUser;
    };

    const sepCitas = async () => {
        const citasPen = []; const citasAcep = []; const citasCan = []; const citasFin = [];
        const citasRoomPen = []; const citasRoomAcep = []; const citasRoomCan = []; const citasRoomFin = [];
        const citasArrenPen = []; const citasArrenAcep = []; const citasArrenCan = []; const citasArrenFin = [];

        for (const doc of userCitas) {
            // Obtener datos del cuarto de acuerdo a la cita
            const docSnapRoom = await getRoom(doc.id_cuarto);
            // Obtener datos del arrendador de acuerdo a la cita
            const docSnapArren = await getUser(doc.id_arrendador);

            if (doc.estadoCita === "Pendiente") {
                citasPen.push(doc);
                citasRoomPen.push({ id: docSnapRoom.id, ...docSnapRoom.data() });
                citasArrenPen.push({ id: docSnapArren.id, ...docSnapArren.data() });
            } else if (doc.estadoCita === "Aceptada") {
                citasAcep.push(doc);
                citasRoomAcep.push({ id: docSnapRoom.id, ...docSnapRoom.data() });
                citasArrenAcep.push({ id: docSnapArren.id, ...docSnapArren.data() });
            } else if (doc.estadoCita === "Cancelada") {
                citasCan.push(doc);
                citasRoomCan.push({ id: docSnapRoom.id, ...docSnapRoom.data() });
                citasArrenCan.push({ id: docSnapArren.id, ...docSnapArren.data() });
            } else if (doc.estadoCita === "Finalizada") {
                citasFin.push(doc);
                citasRoomFin.push({ id: docSnapRoom.id, ...docSnapRoom.data() });
                citasArrenFin.push({ id: docSnapArren.id, ...docSnapArren.data() });
            }
        }

        await setUserCitasPen(citasPen);
        await setUserCitasAcep(citasAcep);
        await setUserCitasCan(citasCan);
        await setUserCitasFin(citasFin);
        await setRoomPen(citasRoomPen);
        await setRoomAcep(citasRoomAcep);
        await setRoomCan(citasRoomCan);
        await setRoomFin(citasRoomFin);
        await setArrenPen(citasArrenPen);
        await setArrenAcep(citasArrenAcep);
        await setArrenCan(citasArrenCan);
        await setArrenFin(citasArrenFin);

    };

    useEffect(() => {
        sepCitas();
    }, [userCitas]);

    if (isLoading) {
        return <Spinner />
    }

    const handleCancel = async (idRoom, idCita) => {
        await RoomDataService.updateEstado(idRoom, 'Disponible');
        await RoomDataService.updateCita(idCita, 'Cancelada');
        setFlag(!flag);
    }

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent={'center'}>
                    <Grid item xs={14}>
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                            Citas Pendientes
                        </Typography>
                        {
                            !userCitasPen.length ? (
                                <>
                                    <Typography gutterBottom variant="p" component="div" textAlign={'center'} >
                                        No Hay Citas Pendientes
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    {
                                        userCitasPen.filter(docCitas => {
                                            const room = roomPen.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenPen.find(docArren => docArren.id === docCitas.id_arrendador);
                                            return room && arren;
                                        }).map((docCitas) => {
                                            const room = roomPen.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenPen.find(docArren => docArren.id === docCitas.id_arrendador);
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
                                                                <b>Fecha de cita: </b> {docCitas.fecha} <b>Hora: </b> {docCitas.hora} <br />
                                                                <b>Direccion: </b> {room.direccion} <br />
                                                                <b>Referencia: </b> {room.referencia} <br />
                                                                <b>Precio: </b> $ {room.precio} <br />
                                                                <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                                                <b>Fecha Registro: </b> {docCitas.fecha_registro}
                                                            </Typography>
                                                        </CardContent>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', marginLeft: 'auto', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button sx={{ color: 'red', m: 1 }}
                                                            startIcon={<Cancel />}
                                                            onClick={(e) => handleCancel(room.id, docCitas.id)}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </Box>
                                                </Card>
                                            );
                                        })
                                    }
                                </>
                            )
                        }
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'} sx={{ mt: 2 }}>
                            Citas Aceptadas
                        </Typography>
                        {
                            !userCitasAcep.length ? (
                                <>
                                    <Typography gutterBottom variant="p" component="div" textAlign={'center'} >
                                        No Hay Citas Aceptadas
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    {
                                        userCitasAcep.filter(docCitas => {
                                            const room = roomAcep.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenAcep.find(docArren => docArren.id === docCitas.id_arrendador);
                                            return room && arren;
                                        }).map((docCitas) => {
                                            const room = roomAcep.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenAcep.find(docArren => docArren.id === docCitas.id_arrendador);
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
                                                                <b>Fecha de cita: </b> {docCitas.fecha} <b>Hora: </b> {docCitas.hora} <br />
                                                                <b>Direccion: </b> {room.direccion} <br />
                                                                <b>Referencia: </b> {room.referencia} <br />
                                                                <b>Precio: </b> $ {room.precio} <br />
                                                                <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                                                <b>Fecha Registro: </b> {docCitas.fecha_registro}
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
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                            Citas Canceladas
                        </Typography>
                        {
                            !userCitasCan.length ? (
                                <>
                                    <Typography gutterBottom variant="p" component="div" textAlign={'center'} >
                                        No Hay Citas Canceladas
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    {
                                        userCitasCan.filter(docCitas => {
                                            const room = roomCan.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenCan.find(docArren => docArren.id === docCitas.id_arrendador);
                                            return room && arren;
                                        }).map((docCitas) => {
                                            const room = roomCan.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenCan.find(docArren => docArren.id === docCitas.id_arrendador);
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
                                                                <b>Fecha de cita: </b> {docCitas.fecha} <b>Hora: </b> {docCitas.hora} <br />
                                                                <b>Direccion: </b> {room.direccion} <br />
                                                                <b>Referencia: </b> {room.referencia} <br />
                                                                <b>Precio: </b> $ {room.precio} <br />
                                                                <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                                                <b>Fecha Registro: </b> {docCitas.fecha_registro}
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
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'} sx={{ mt: 2 }}>
                            Citas Finalizadas
                        </Typography>
                        {
                            !userCitasFin.length ? (
                                <>
                                    <Typography gutterBottom variant="p" component="div" textAlign={'center'} >
                                        No Hay Citas Finalizadas
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    {
                                        userCitasFin.filter(docCitas => {
                                            const room = roomFin.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenFin.find(docArren => docArren.id === docCitas.id_arrendador);
                                            return room && arren;
                                        }).map((docCitas) => {
                                            const room = roomFin.find(docRoom => docRoom.id === docCitas.id_cuarto);
                                            const arren = arrenFin.find(docArren => docArren.id === docCitas.id_arrendador);
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
                                                                <b>Fecha de cita: </b> {docCitas.fecha} <b>Hora: </b> {docCitas.hora} <br />
                                                                <b>Direccion: </b> {room.direccion} <br />
                                                                <b>Referencia: </b> {room.referencia} <br />
                                                                <b>Precio: </b> $ {room.precio} <br />
                                                                <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                                                <b>Fecha Registro: </b> {docCitas.fecha_registro}
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
        </motion.div>
    )
}

export default CitasUser