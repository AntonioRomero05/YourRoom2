import React, { useState,useEffect } from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    Button,
    CardContent,
    Snackbar,
    Alert
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { db } from '../../firebase/Firebase';
import {
    doc,
    updateDoc
} from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import RoomDataService from '../Cuartos/room.servicies'

function ContratoCuarto({ citasConfir }) {
    const { user } = useAuth();
    const [roomInfo, setRoomInfo] = useState([]);
    const [arrenInfo, setArrenInfo] = useState([]);
    const [openSnackSubmit, setOpenSnackSubmit] = useState(false);
    const [openSnackCancel, setOpenSnackCancel] = useState(false);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getInfoCitas();
    }, [flag]);

    const getRoom = async (id) => {
        const docSnapRoom = await RoomDataService.getRoom(id);
        return docSnapRoom;
    };

    const getUser = async (id) => {
        const docSnapUser = await RoomDataService.getUser(id);
        return docSnapUser;
    };

    const getInfoCitas = async () => {
        const citasRoom = [];
        const citasArren = [];

        for (const doc of citasConfir) {
            // Obtener datos del cuarto de acuerdo a la cita
            const docSnapRoom = await getRoom(doc.id_cuarto);
            // Obtener datos del arrendatario de acuerdo a la cita
            const docSnapArren = await getUser(doc.id_arrendador);

            if (doc.estadoCita === "Aceptada") {
                citasRoom.push({ id: docSnapRoom.id, ...docSnapRoom.data() });
                citasArren.push({ id: docSnapArren.id, ...docSnapArren.data() });
            }
        }
        await setRoomInfo(citasRoom);
        await setArrenInfo(citasArren);
    };

    const handleCloseSnackSubmit = () =>{
        setOpenSnackSubmit(false);
    };
    const handleCloseSnackCancel = () =>{
        setOpenSnackCancel(false);
    };
    const handleRechazar = async (idRoom, idCita) => {
        await RoomDataService.updateEstado(idRoom, 'Disponible');
        await RoomDataService.updateCita(idCita, 'Finalizada');
        setOpenSnackCancel(true);
        if(roomInfo.length - 1 === 0){
            window.location.reload();
        }
        // setTimeout(() => {
        //     window.location.reload();
        //   }, 4000);
        setFlag(!flag);
    }
    const handleAceptar = async (idRoom, idCita) =>{
        await RoomDataService.updateCita(idCita, 'Finalizada');
        await RoomDataService.updateEstado(idRoom, 'Ocupado');
        const documentRef = doc(db, "rooms", idRoom);
        const nuevoCampo = { 'id_usuario': user.uid };
        await updateDoc(documentRef, nuevoCampo);
        setOpenSnackSubmit(true);
        if(roomInfo.length - 1 === 0){
            window.location.reload();
        }
        // setTimeout(() => {
        //   }, 4000);
        setFlag(!flag);
    }

    return (
        <>
            <Snackbar
                open={openSnackSubmit}
                autoHideDuration={4000} // Duración en ms que se muestra la notificación
                onClose={handleCloseSnackSubmit}
            >
                <Alert onClose={handleCloseSnackSubmit} severity="success" sx={{ width: '100%', backgroundColor: '#4CAF50', color: 'white' }}>
                    El cuarto ha sido enlazado a su cuenta, verifique en la seccion 'Mi Cuarto'
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackCancel}
                autoHideDuration={4000} // Duración en ms que se muestra la notificación
                onClose={handleCloseSnackCancel}
            >
                <Alert onClose={handleCloseSnackCancel} severity="error" sx={{ width: '100%', backgroundColor: '#F44336', color: 'white' }}>
                    Se ha rechazado el cuarto correctamente
                </Alert>
            </Snackbar>
            {
                citasConfir.filter(docCitas => {
                    const room = roomInfo.find(docRoom => docRoom.id === docCitas.id_cuarto);
                    const arren = arrenInfo.find(docArren => docArren.id === docCitas.id_arrendador);
                    return room && arren;
                }).map((docCitas) => {
                    const room = roomInfo.find(docRoom => docRoom.id === docCitas.id_cuarto);
                    const arren = arrenInfo.find(docArren => docArren.id === docCitas.id_arrendador);
                    return (
                        <Card sx={{ maxWidth: 850, p: 1 }}>
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
                                        <b>Arrendador: </b> {arren.nombre} {arren.apellidoP} {arren.apellidoM} <br />
                                        <b>Direccion: </b> {room.direccion} <br />
                                        <b>Referencia: </b> {room.referencia} <br />
                                        <b>Precio: </b> $ {room.precio} <br />
                                        <b>Servicios: </b> {room.servicios} <br />
                                        <b>Baño: </b> {room.baño}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box sx={{ display: 'flex', marginLeft: 'auto', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button sx={{ color: 'red', mr: 3 }}
                                    startIcon={<Cancel />}
                                    onClick={(e) => handleRechazar(room.id, docCitas.id)}
                                >
                                    Rechazar
                                </Button>
                                <Button sx={{ color: 'green' }}
                                    startIcon={<CheckCircle />}
                                    onClick={(e) => handleAceptar(room.id, docCitas.id)}
                                >
                                    Aceptar
                                </Button>
                            </Box>
                        </Card>
                    );
                })
            }
        </>
    )
}

export default ContratoCuarto