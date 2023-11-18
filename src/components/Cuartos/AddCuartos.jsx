import React, {useState, useEffect}  from 'react';
import { 
    Typography, Box, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem,
    Dialog, Slide, Container, AppBar, Toolbar, IconButton 
} from '@mui/material';
import { AddCircleOutline} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CloseIcon from '@mui/icons-material/Close';
import classRoom from './room.servicies';
import Error from '../Alert/Error';
import Success from '../Alert/Success';

const inputsStyle = {
    display: 'flex',
}

const optionSelect = [
    {
        id: 1,
        option: 'Si',
        valor: '1'
    },
    {
        id: 2,
        option: 'No',
        valor: '0'
    }
]

const Inmueble = [
    {
        id: 1,
        tipo: 'Cuarto',
        valor: '0'
    },
    {
        id: 2,
        tipo: 'Departamento',
        valor: '1'
    },
    {
        id: 3,
        tipo: 'Casa',
        valor: '2'
    }
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddCuartos = ({id, setRoomId, user}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [roomData, setRoomData] = useState({
        direccion: "",
        descripcion: "",
        urlimagen: "",
        titulo: "",
        tipoInmueble: "",
        capacidad: "",
        agua: "",
        luz: "",
        internet: "",
        lavaderos: "",
        clima: "",
        amueblado: "",
        semiamueblado: "",
        compartido: "",
        banoCompartido: "",
        precioRenta: "",
        zonaEscolar: "",
        id_arrendador: ""
    });

    const resetForm = () => {
        setRoomData({
            direccion: "",
            descripcion: "",
            urlimagen: "",
            titulo: "",
            tipoInmueble: "",
            capacidad: "",
            agua: "",
            luz: "",
            internet: "",
            lavaderos: "",
            clima: "",
            amueblado: "",
            semiamueblado: "",
            compartido: "",
            banoCompartido: "",
            precioRenta: "",
            zonaEscolar: "",
            id_arrendador: ""
        });
        id='';
        setRoomId('');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm(); 
    };

    function getData(tipo_inmueble, capacidad, agua, luz, internet, lavaderos, clima, amueblado, semiamueblado, compartido, banio_compartido, zona_escolar) {
        const apiUrl = 'https://joserom.pythonanywhere.com/';
        const inputData = {
            "tipo_inmueble": tipo_inmueble,
            "capacidad": capacidad,
            "agua": agua,
            "luz": luz,
            "internet": internet,
            "lavaderos": lavaderos,
            "clima": clima,
            "amueblado": amueblado,
            "semiamueblado": semiamueblado,
            "compartido": compartido,
            "banio_compartido": banio_compartido,
            "zona_escolar": zona_escolar
        };
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        };

        return new Promise((resolve, reject) => {
            fetch(apiUrl, requestOptions)
                .then(response => response.json())
                .then(data => {
                    const prediccion = data.prediccion;
                    resolve(prediccion);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    const handlePrecio = async(e) => {
        e.preventDefault();
        setSuccess('Calculando...');
        const capacidad = parseInt(roomData.capacidad);
        const compartido = parseInt(roomData.compartido);
        const tipoInmueble = parseInt(roomData.tipoInmueble);
        const agua = parseInt(roomData.agua);
        const luz = parseInt(roomData.luz);
        const internet = parseInt(roomData.internet);
        const lavaderos = parseInt(roomData.lavaderos);
        const clima = parseInt(roomData.clima);
        const amueblado = parseInt(roomData.amueblado);
        const semiamueblado = parseInt(roomData.semiamueblado);
        const banoCompartido = parseInt(roomData.banoCompartido);
        const zonaEscolar = parseInt(roomData.zonaEscolar);
        getData(tipoInmueble, capacidad, agua, luz, internet, lavaderos, clima, amueblado, semiamueblado, compartido, banoCompartido, zonaEscolar)
            .then(prediccion => {
                console.log('Predicción:', prediccion);
                setSuccess('El precio sugerido es: ' + prediccion.toFixed(2));
                setError("");
            })
            .catch(error => {
                console.log('Error:', error);
                setError('Algo ha salido mal, intente de nuevo');
                setSuccess("");
            });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const capacidadInt = parseInt(roomData.capacidad, 10);
            const compartidoInt = parseInt(roomData.compartido, 10);
            const tipoInmuebleInt = parseInt(roomData.tipoInmueble, 10);
            const aguaInt = parseInt(roomData.agua, 10);
            const luzInt = parseInt(roomData.luz, 10);
            const internetInt = parseInt(roomData.internet, 10);
            const lavaderosInt = parseInt(roomData.lavaderos, 10);
            const climaInt = parseInt(roomData.clima, 10);
            const amuebladoInt = parseInt(roomData.amueblado, 10);
            const semiamuebladoInt = parseInt(roomData.semiamueblado, 10);
            const banoCompartidoInt = parseInt(roomData.banoCompartido, 10);
            const zonaEscolarInt = parseInt(roomData.zonaEscolar, 10);
            const precioRentaInt = parseInt(roomData.precioRenta, 10);

            if(id !== undefined && id !== ""){
                
                await classRoom.updateRoom(id, {
                    direccion: roomData.direccion,
                    descripcion: roomData.descripcion,
                    urlimagen: roomData.urlimagen,
                    titulo: roomData.titulo,
                    tipoInmueble: tipoInmuebleInt,
                    capacidad: capacidadInt,
                    agua: aguaInt,
                    luz: luzInt,
                    internet: internetInt,
                    lavaderos: lavaderosInt,
                    clima: climaInt,
                    amueblado: amuebladoInt,
                    semiamueblado: semiamuebladoInt,
                    compartido: compartidoInt,
                    banoCompartido: banoCompartidoInt,
                    precioRenta: precioRentaInt,
                    zonaEscolar: zonaEscolarInt,
                    id_arrendador: user
                });
                setRoomId("");
                id=''
                console.log(id);
            }else{
                console.log("addRooms", roomData);
                await classRoom.addRooms({
                    direccion: roomData.direccion,
                    descripcion: roomData.descripcion,
                    urlimagen: roomData.urlimagen,
                    titulo: roomData.titulo,
                    tipoInmueble: tipoInmuebleInt,
                    capacidad: capacidadInt,
                    agua: aguaInt,
                    luz: luzInt,
                    internet: internetInt,
                    lavaderos: lavaderosInt,
                    clima: climaInt,
                    amueblado: amuebladoInt,
                    semiamueblado: semiamuebladoInt,
                    compartido: compartidoInt,
                    banoCompartido: banoCompartidoInt,
                    precioRenta: precioRentaInt,
                    zonaEscolar: zonaEscolarInt,
                    id_arrendador: user
                });
            }
        }catch(err){
            console.log(err);
        }
        handleClose();
    }

    const editHandler = async() => {
        try{
            const docSnap = await classRoom.getRoom(id);
            const roomDataFromFirebase = docSnap.data();

            setRoomData({
                ...roomData,
                titulo: roomDataFromFirebase.titulo,
                direccion: roomDataFromFirebase.direccion,
                capacidad: roomDataFromFirebase.capacidad,
                compartido: roomDataFromFirebase.compartido,
                tipoInmueble: roomDataFromFirebase.tipoInmueble,
                descripcion: roomDataFromFirebase.descripcion,
                agua: roomDataFromFirebase.agua,
                luz: roomDataFromFirebase.luz,
                internet: roomDataFromFirebase.internet,
                lavaderos: roomDataFromFirebase.lavaderos,
                clima: roomDataFromFirebase.clima,
                amueblado: roomDataFromFirebase.amueblado,
                semiamueblado: roomDataFromFirebase.semiamueblado,
                banoCompartido: roomDataFromFirebase.banoCompartido,
                zonaEscolar: roomDataFromFirebase.zonaEscolar,
                precioRenta: roomDataFromFirebase.precioRenta,
            });
            handleClickOpen();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(id !== undefined && id !== ""){
            editHandler();
        } else {
            resetForm();
        }
    }, [id]);

    return (
        <div>
            <Button
                sx={{color:'black'}}
                endIcon={<AddCircleOutline sx={{width: 35, height: 35}}/>}
                onClick={handleClickOpen}
            >
                Agregar Cuarto
            </Button>
            <Dialog      
                open={open}
                onClose={handleClose}
                maxWidth="md"
                TransitionComponent={Transition}
            >      
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                        <IconButton
                            color='inherit'
                            onClick={handleClose}
                            aria-label="close"
                            sx={{marginLeft: 'auto'}} 
                        >
                            <CloseIcon/>
                        </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Container component="main">
                        <Typography variant='h5'>Formulario de Registro de Cuarto</Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        style={inputsStyle} 
                                        label='Titulo de la publicación' 
                                        id='txtTitulo'
                                        variant='filled' 
                                        value={roomData.titulo}
                                        onChange={(e) => setRoomData({ ...roomData, titulo: e.target.value })} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        style={inputsStyle} 
                                        label='Dirección' 
                                        id='txtDireccion'
                                        variant='filled' 
                                        value={roomData.direccion}
                                        onChange={(e) => setRoomData({ ...roomData, direccion: e.target.value })}
                                    />
                                </Grid> 
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        style={inputsStyle} 
                                        type='number' 
                                        name="capacidad"
                                        label='Capacidad para:' 
                                        id='txtCapacidad'
                                        variant='filled' 
                                        value={roomData.capacidad}
                                        onChange={(e) => setRoomData({ ...roomData, capacidad: e.target.value })}
                                    />
                                </Grid>       
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        style={inputsStyle} 
                                        type='number' 
                                        name="compartido"
                                        label='Compartido maximo para:' 
                                        id='txtCompartido'
                                        variant='filled' 
                                        value={roomData.compartido}
                                        onChange={(e) => setRoomData({ ...roomData, compartido: e.target.value })}
                                    />
                                </Grid>    
                                <Grid item xs={12} sm={4}>
                                    <FormControl 
                                        sx={{ width: '100%' }} 
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Tipo de Inmueble</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            label="Tipo de Inmueble"
                                            id='txtTipoInmueble'
                                            value={roomData.tipoInmueble}
                                            onChange={(e) => setRoomData({ ...roomData, tipoInmueble: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {Inmueble && Inmueble.map((i, index) =>(
                                                <MenuItem key={i.id} value={i.valor}>{i.tipo}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>              
                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField 
                                        style={inputsStyle} 
                                        label='Descripcion de la publicación' 
                                        variant='filled'
                                        multiline
                                        rows={2} 
                                        value={roomData.descripcion}
                                        onChange={(e) => setRoomData({ ...roomData, descripcion: e.target.value })}  
                                    />
                                </Grid>         
                                <Grid item xs={12}>
                                    <Typography variant='p'>Cuenta con los siguientes servicios: </Typography>
                                </Grid>    
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Agua</InputLabel>
                                        <Select
                                            name="agua"
                                            fullwidth
                                            label="Agua"
                                            id='txtAgua'
                                            value={roomData.agua}
                                            onChange={(e) => setRoomData({ ...roomData, agua: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Luz</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="Luz"
                                            label="Luz"
                                            id='txtLuz'
                                            value={roomData.luz}
                                            onChange={(e) => setRoomData({ ...roomData, luz: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Internet</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="internet"
                                            label="Internet"
                                            id='txtInternet'
                                            value={roomData.internet}
                                            onChange={(e) => setRoomData({ ...roomData, internet: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Lavaderos</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="lavaderos"
                                            label="lavaderos"
                                            id='txtLavaderos'
                                            value={roomData.lavaderos}
                                            onChange={(e) => setRoomData({ ...roomData, lavaderos: e.target.value })} 
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Clima</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="clima"
                                            label="Clima"
                                            id='txtClima'
                                            value={roomData.clima}
                                            onChange={(e) => setRoomData({ ...roomData, clima: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Amueblado</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="amueblado"
                                            label="Amueblado"
                                            id='txtAmueblado'
                                            value={roomData.amueblado}
                                            onChange={(e) => setRoomData({ ...roomData, amueblado: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Semiamueblado</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="semiamueblado"
                                            label="Semiamueblado"
                                            id='txtSemiamueblado'
                                            value={roomData.semiamueblado}
                                            onChange={(e) => setRoomData({ ...roomData, semiamueblado: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Baño Compartido</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="baño"
                                            label="Baño Compartido"
                                            id='txtBano'
                                            value={roomData.banoCompartido}
                                            onChange={(e) => setRoomData({ ...roomData, banoCompartido: e.target.value })} 
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12} sm={3}>
                                    <FormControl 
                                        sx={{ width: '100%' }}
                                        variant="filled"
                                    >
                                        <InputLabel id="demo-simple-select-label">Zona Escolar</InputLabel>
                                        <Select
                                            fullwidth="true"
                                            name="zonaEscolar"
                                            label="Zona Escolar"
                                            id='txtZonaEscolar'
                                            value={roomData.zonaEscolar}
                                            onChange={(e) => setRoomData({ ...roomData, zonaEscolar: e.target.value })}
                                        >
                                            <MenuItem>Seleccione</MenuItem>
                                            {optionSelect && optionSelect.map((c, index) =>(
                                                <MenuItem key={c.id} value={c.valor}>{c.option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item xs={12}>
                                    <Typography variant='p'>Puede calcular el costo aproximado si lo desea:</Typography>
                                </Grid>  
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        type='number' 
                                        style={inputsStyle} 
                                        label='Precio' 
                                        id='txtPrecio'
                                        variant='filled' 
                                        value={roomData.precioRenta}
                                        onChange={(e) => setRoomData({ ...roomData, precioRenta: e.target.value })} 
                                    />
                                </Grid>  
                                <Grid item xs={12} sm={4}>
                                    <Button                     
                                        fullwidth="true"
                                        variant='contained' 
                                        endIcon={<PriceCheckIcon/>}  
                                        onClick={handlePrecio}
                                        sx={{ height: 55}}
                                    >
                                        Calcular
                                    </Button> 
                                </Grid>
                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={6}>
                                    {success && <Success message={success} />}
                                    {error && <Error message={error} />}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='p'>Fotografia: </Typography><br/>
                                    <TextField type='file'/>               
                                </Grid>   
                                <Grid item xs={12}>
                                    <Button                     
                                        variant='contained' 
                                        fullwidth="true"
                                        color='success'
                                        endIcon={<AddIcon/>}
                                        sx={{ mb: 2}}         
                                        type="submit"
                                    >
                                        {id !== undefined && id !== "" ? "Actualizar" : "Guardar"}
                                    </Button>   
                                </Grid>                 
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </Dialog>
        </div>
    );
};

export default AddCuartos;