import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { NavLink as RouterLink } from 'react-router-dom';

const Pagado = [
    {
        id: 1,
        pagado: 'Pagado',
    },
    {
        id: 2,
        pagado: 'No Pagado',
    }
]
const Mes = [
    {
        id: 1,
        mes: 'Enero',
    },
    {
        id: 2,
        mes: 'Febrero',
    },
    {
        id: 3,
        mes: 'Marzo',
    },
    {
        id: 4,
        mes: 'Abril',
    },
    {
        id: 5,
        mes: 'Mayo',
    },
    {
        id: 6,
        mes: 'Junio',
    },
    {
        id: 7,
        mes: 'Julio',
    },
    {
        id: 8,
        mes: 'Agosto',
    },
    {
        id: 9,
        mes: 'Septiembre',
    },
    {
        id: 10,
        mes: 'Octubre',
    },
    {
        id: 11,
        mes: 'Noviembre',
    },
    {
        id: 12,
        mes: 'Diciembre',
    }
]

const Ingresos = () => {  
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                    <Grid item xs={12}>
                        <Box textAlign='left' paddingTop={2}>
                            <Button
                                sx={{color:'black'}}
                                startIcon={<ArrowBack/>}
                                component={RouterLink}
                                to='/miscuartos'
                            >
                                Regresar
                            </Button>
                        </Box>
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                            Mis Ingresos
                        </Typography>
                        <Box sx={{ maxWidth: 900, mt:2, minWidth: {sm: 500}, display: {md: 'flex',sm: 'flex', xs: 'block'}, color: 'text.secondary'}}>
                            <Typography sx={{margin:'auto'}}>
                                Total de cuartos: 4
                            </Typography>
                            <Typography sx={{margin:'auto'}}>
                                Libres: 2
                            </Typography>
                            <Typography sx={{margin:'auto'}}>
                                Ocupados: 2
                            </Typography>
                            <Typography sx={{marginTop: 'auto', marginLeft: 'auto', marginBottom: 'auto', marginRight: 1}}>
                                Filtrar por:
                            </Typography>
                            <Box sx={{ width: 150}}>
                                <FormControl 
                                    sx={{width:'100%'}}
                                >
                                    <InputLabel id="demo-simple-select-label">Seleccione</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem>Seleccione</MenuItem>
                                        {Pagado && Pagado.map((p, index) =>(
                                            <MenuItem id={p.id} value={p.pagado}>{p.pagado}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Typography sx={{marginTop: 'auto', marginLeft: 'auto', marginBottom: 'auto', marginRight: 1}}>
                                Mes:
                            </Typography>
                            <Box sx={{ width: 150}}>
                                <FormControl 
                                    sx={{width:'100%'}}
                                >
                                    <InputLabel id="demo-simple-select-label">Seleccione</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem>Seleccione</MenuItem>
                                        {Mes && Mes.map((m, index) =>(
                                            <MenuItem id={m.id} value={m.mes}>{m.mes}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Card sx={{ maxWidth: 850, m:2, p:1}}>
                            <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    sx={{ width: 140, display: 'block', alignSelf: 'auto' }}
                                    image={require('../assets/user1.png')}
                                    alt="Cuarto Individual"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Cuarto Individual
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Arrendatario: Rodrigo Martinez Hernandez<br/> <br />
                                        Renta del mes actual: $1,300<br/> <br />
                                        Estatus: <b>PAGADO</b>
                                    </Typography>
                                </CardContent>                             
                            </CardActionArea>            
                        </Card>
                        <Card sx={{ maxWidth: 850, m:2, p:1}}>
                            <CardActionArea sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    sx={{ width: 140, display: 'block', alignSelf: 'auto' }}
                                    image={require('../assets/user2.png')}
                                    alt="Cuarto Individual"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Cuarto Individual
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Arrendatario: Jesus David Hernandez Hernandez<br/> <br />
                                        Renta del mes actual: $1,300<br/> <br />
                                        Estatus: <b>PAGADO</b>
                                    </Typography>
                                </CardContent>                             
                            </CardActionArea>            
                        </Card>
                        <Box sx={{ maxWidth: 850, mt:2, display: 'flex', color: 'text.secondary'}}>
                            <Typography variant="body2" color="initial">
                                Ingreso Estimado del Mes: $ 2,500 <br /> <br />
                                Ingresos Actuales del Mes: $ 2,500 <br /> <br />
                                Pagos Faltantes: $ 0
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Ingresos;