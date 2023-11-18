import React, {useState} from 'react';
import { 
  Typography, Box, TextField, Grid, Button, Container 
} from '@mui/material';
import classRoom from '../Cuartos/room.servicies';

const RegistCuarto = () => {
    
    const [cuarto, setCuarto] = useState({
        Zona: '',
	    baño: '',
	    capacidad: '',
	    compania: '',
	    descripcion: '',
        direccion: '',
        estado: 'Disponible',
        fecha_publicacion: '',
        inmueble: '',
        precio: '',
        referencia: '',
        servicios: '',
        titulo: '',
    });

    const handleSubmit = async() =>{
        await classRoom.addRooms(cuarto);
    }

    return (
        <Box>
          <Container>
            <Typography variant='h5'>Formulario de Registro de Cuarto</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Zona' 
                    variant='filled'
                    name='Zona'
                    onChange={(e) => setCuarto({ ...cuarto, Zona: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Baño' 
                    variant='filled'
                    name='baño'
                    onChange={(e) => setCuarto({ ...cuarto, baño: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Capacidad' 
                    variant='filled'
                    name='capacidad'
                    onChange={(e) => setCuarto({ ...cuarto, capacidad: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Compania' 
                    variant='filled'
                    name='compania'
                    onChange={(e) => setCuarto({ ...cuarto, compania: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Descripcion' 
                    variant='filled'
                    name='descripcion'
                    onChange={(e) => setCuarto({ ...cuarto, descripcion: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Direccion' 
                    variant='filled'
                    name='direccion'
                    onChange={(e) => setCuarto({ ...cuarto, direccion: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Fecha' 
                    variant='filled'
                    name='fecha'
                    onChange={(e) => setCuarto({ ...cuarto, fecha_publicacion: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Inmueble' 
                    variant='filled'
                    name='inmueble'
                    onChange={(e) => setCuarto({ ...cuarto, inmueble: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Precio' 
                    variant='filled'
                    name='precio'
                    onChange={(e) => setCuarto({ ...cuarto, precio: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Referencia' 
                    variant='filled'
                    name='referencia'
                    onChange={(e) => setCuarto({ ...cuarto, referencia: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Servicios' 
                    variant='filled'
                    name='servicios'
                    onChange={(e) => setCuarto({ ...cuarto, servicios: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label='Titulo' 
                    variant='filled'
                    name='titulo'
                    onChange={(e) => setCuarto({ ...cuarto, titulo: e.target.value })}
                  />              
                </Grid>
                <Grid item xs={12}>
                    <Button                     
                        variant='contained' 
                        id='enviar'
                        fullwidth
                        color='success'
                        sx={{ mb: 2}}         
                        type="submit"
                        >
                        Guardar
                    </Button>   
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
  )
}

export default RegistCuarto