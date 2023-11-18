import React, {useState} from 'react'
import {
    Typography,
    Button,
    Link,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Grid,
    TextField,
    Snackbar,
    Alert
} from '@mui/material/';
import { db  } from '../firebase/Firebase';
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import moment from 'moment/moment';

import { useAuth } from '../context/authContext';
import RoomDataService from './Cuartos/room.servicies'

function FormCita({room}) {
    const [open, setOpen] = useState(false);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [error, setError] = useState(true);
    const [errorFecha, setErrorFecha] = useState(true);
    const [leyendaFecha, setLeyendaFecha] = useState('');
    const [errorHora, setErrorHora] = useState(true);
    const [leyendaHora, setLeyendaHora] = useState('');
    const [openSnackSubmit, setOpenSnackSubmit] = useState(false);
    const [openSnackCancel, setOpenSnackCancel] = useState(false);
    const [userCita, setUserCita] = useState([]);
    const [fechaSolicitud, setFechaSolicitud] = useState('');
    const { user } = useAuth();

    const getData = async() => {
        const q = query(collection(db, "citas"), 
                  where("id_usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        if(docs.length){
            setUserCita(docs);
        }
    };

    const handleFecha = (e) => {
        const fechaCita = e.target.value;
        // Parsear fecha con moment.js
        const fechaSel = moment(fechaCita);      
        // Obtener fecha actual
        const fechaA = moment();
        const dia = fechaA.date();
        const month = fechaA.month() + 1;
        const año = fechaA.year();
        // Formatear fecha actual
        const fechaActual = moment(`${año}-${month}-${dia}`);
        setFechaSolicitud(`${año}-${month}-${dia}`);
        // Agregar 3 días
        const nuevaFecha = moment(fechaActual).add(3, 'days');
        // Agregar 7 días
        const nuevaFecha2 = moment(fechaActual).add(7, 'days');
        // Validar fechas
        if (fechaSel.isBefore(fechaActual)) {
          setErrorFecha(true);
          setError(true);
          setLeyendaFecha('La Fecha Debe Ser Valida');
        } else if (fechaSel.isBefore(nuevaFecha)) {
          setErrorFecha(true);
          setError(true);
          setLeyendaFecha('La Fecha Debe Ser Mayor A 3 Dias');
        } else if (fechaSel.isAfter(nuevaFecha2)) {
          setErrorFecha(true);
          setError(true);
          setLeyendaFecha('La Fecha No Debe Ser Mayor A 7 Dias');
        } else {
            setFecha(fechaCita);
            if(hora){
                setErrorHora(false)
                setLeyendaHora('');
                setError(false);
            };
            setErrorFecha(false);
            setLeyendaFecha('');
            if (!errorHora) {
                setError(false);
            }
        }
      }

      const handleHora = (e) => {
        const horaSel = e.target.value;
        const horaMoment = moment(horaSel, 'HH:mm'); // Parsear la hora con moment.js      
        const horaMenor = moment('06:59', 'HH:mm'); // Crear un objeto moment.js para la hora menor
        const horaMayor = moment('16:01', 'HH:mm'); // Crear un objeto moment.js para la hora mayor
        if (!horaMoment.isBetween(horaMenor, horaMayor, 'minute', [])) {
            setErrorHora(true);
            setError(true);
            setLeyendaHora('Seleccione una hora entre las 7:00 y las 16:00');
            return;
          } 
          else {
            setHora(horaSel);
            setErrorHora(false);
            setLeyendaHora('');
            if (!errorFecha) setError(false);
        }
      };

    const handleClickOpen = () => {
        setOpen(true);
        getData();
    };

    const handleSubmit = () => {
        let isInvalido = false;
        if (userCita) {
            {userCita.map((cita, index) => {
                const fechaS = moment(fecha);
                if(fechaS.isSame(moment(cita.fecha))){
                    const horaCitaExis = cita.hora;
                    const selHora = moment(hora, 'HH:mm');
                    const horarioCita = moment(horaCitaExis, 'HH:mm');    
                    const horarioExBe = moment(horarioCita).subtract(59, 'minute'); // Utilizar moment.js para restar una hora
                    const horarioExAf = moment(horarioCita).add(59, 'minute'); // Utilizar moment.js para sumar una hora
                    if ( selHora.isBetween(horarioExBe, horarioExAf, 'minute', []) ) {
                        setLeyendaHora('Usted Ya Tiene Una Cita A Las ' + cita.hora + 
                            ' En La Misma Fecha, Debe Haber Al Menos Una Hora De Diferencia');
                        setErrorHora(true);
                        setError(true);
                        isInvalido = true;
                    }
                }
            })}
        }
        if(!isInvalido){
            const newCita = {
                'fecha': fecha,
                'hora': hora,
                'id_cuarto': room.id,
                'id_arrendador': room.id_arrendador,
                'id_usuario': user.uid,
                'estadoCita': 'Pendiente',
                'fecha_registro': fechaSolicitud
              };
              try{
                RoomDataService.addCita(newCita);
                RoomDataService.updateEstado(room.id, 'Reservado');
                handleCloseSubmit();
              }catch(err){
                console.log(err);
              }
        }
    }
    
    const handleCloseSubmit = () => {
        setOpenSnackSubmit(true);
        setErrorFecha(true);
        setLeyendaFecha('');
        setErrorHora(true);
        setLeyendaHora('');
        setError(true);
        setOpen(false);
    }

    const handleCloseCancel = () => {
        setOpenSnackCancel(true);
        setErrorFecha(true);
        setLeyendaFecha('');
        setErrorHora(true);
        setLeyendaHora('');
        setError(true);
        setOpen(false);
    };

    const handleCloseSnackSubmit = () =>{
        setOpenSnackSubmit(false);
    };
    const handleCloseSnackCancel = () =>{
        setOpenSnackCancel(false);
    };

    return (
        <div>          
            <Typography variant='div'>
                <Link sx={{textDecoration:'none',color:'white'}} onClick={handleClickOpen}> SOLICITAR CITA</Link>
            </Typography>
            <Snackbar
                open={openSnackSubmit}
                autoHideDuration={4000} // Duración en ms que se muestra la notificación
                onClose={handleCloseSnackSubmit}
            >
                <Alert onClose={handleCloseSnackSubmit} severity="success" sx={{ width: '100%', backgroundColor: '#4CAF50', color: 'white' }}>
                    La Cita Ah Sido Agendada, Espere La Confirmacion
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackCancel}
                autoHideDuration={4000} // Duración en ms que se muestra la notificación
                onClose={handleCloseSnackCancel}
            >
                <Alert onClose={handleCloseSnackCancel} severity="error" sx={{ width: '100%', backgroundColor: '#F44336', color: 'white' }}>
                    El Registro De La Cita Ah Sido Cancelado
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={handleCloseCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Registro de Cita"}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description" component={'div'}>
                        <Box component="form" sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        autoFocus
                                        title="Campo Fecha de cita"
                                        fullWidth
                                        id="date"
                                        label="Seleccione una fecha"
                                        type="date"
                                        sx={{ width: 267}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name='fecha'
                                        onChange={handleFecha}
                                        error={errorFecha}
                                        helperText={leyendaFecha}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} sx={{mt:2}}>
                                    <TextField
                                        required
                                        autoFocus
                                        id="time"
                                        label="Seleccione la hora"
                                        type="time"
                                        fullWidth
                                        defaultValue={'07:00'}
                                        sx={{ width: 267}}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        name='hora'
                                        onChange={handleHora}
                                        error={errorHora}
                                        helperText={leyendaHora}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCloseCancel}>Cancelar</Button>
                    <Button 
                        onClick={handleSubmit}
                        autoFocus
                        disabled={error}
                    >
                        Registrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormCita