import React, {useState, useEffect}  from 'react';
import { 
  Typography, Box, Checkbox, TextField, FormControlLabel, Grid, Button, FormControl, InputLabel, Select, MenuItem,
  Dialog, Slide, Container, AppBar, Toolbar, IconButton 
} from '@mui/material';
import { AddCircleOutline} from '@mui/icons-material';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import CloseIcon from '@mui/icons-material/Close';
import classRoom from './room.servicies';

const inputsStyle = {
  display: 'flex',
}
//Datos de los select 
const Inmueble = [
  {
    id: 1,
    tipo: 'Piso',
  },
  {
    id: 2,
    tipo: 'Cuarto',
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
//Trancion ventana
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AggCuarto = ({id, setRoomId, user}) => {
  const [open, setOpen] = useState(false);
  const [zona, setZona] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [inmueble, setInmueble] = useState("");
  const [compania, setCompania] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //ADD CUARTOS
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newRoom = {
      zona,
      direccion,
      precio,
      inmueble,
      compania,
      descripcion,
      user
    };
    try{
      if(id !== undefined && id !== ""){
        await classRoom.updateRoom(id, newRoom);
        setRoomId("");
      }else{
        await classRoom.addRooms(newRoom);
      }
    }catch(err){
      console.log(err);
    }
    setZona("");
    setDireccion("");
    setPrecio("");
    setInmueble("");
    setCompania("");
    setDescripcion("");
    setRoomId("");
    handleClose();
  }

  const editHandler = async() => {
    try{
      const docSnap = await classRoom.getRoom(id);
      setZona(docSnap.data().zona);
      setDireccion(docSnap.data().direccion);
      setPrecio(docSnap.data().precio);
      setInmueble(docSnap.data().inmueble);
      setCompania(docSnap.data().compania);
      setDescripcion(docSnap.data().descripcion);
      handleClickOpen();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(id !== undefined && id !== ""){
      editHandler();
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

          <Container component="main" maxWidth="sm">
            <Typography variant='h5'>Formulario de Registro de Cuarto</Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    style={inputsStyle} 
                    label='Zona' 
                    variant='filled' 
                    value={zona}
                    onChange={(e) => setZona(e.target.value)} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    style={inputsStyle} 
                    label='Dirección' 
                    variant='filled' 
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    type='number' 
                    style={inputsStyle} 
                    label='Precio' 
                    variant='filled' 
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)} 
                  />
                </Grid>                                      
                <Grid item xs={12} sm={6}>
                  <FormControl 
                    sx={{ width: '100%' }} 
                    variant="filled"
                  >
                      <InputLabel id="demo-simple-select-label">Tipo de Inmueble</InputLabel>
                      <Select
                        fullwidth
                        label="Tipo de Inmueble"
                        value={inmueble}
                        onChange={(e) => setInmueble(e.target.value)} 
                      >
                        <MenuItem>Seleccione</MenuItem>
                        {Inmueble && Inmueble.map((i, index) =>(
                            <MenuItem key={i.id} value={i.tipo}>{i.tipo}</MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl 
                      sx={{ width: '100%' }}
                      variant="filled"
                  >
                      <InputLabel id="demo-simple-select-label">Compañeros</InputLabel>
                      <Select
                        name="compania"
                        fullwidth
                        label="Compañeros"
                        value={compania}
                        onChange={(e) => setCompania(e.target.value)} 
                      >
                          <MenuItem>Seleccione</MenuItem>
                          {Compas && Compas.map((c, index) =>(
                              <MenuItem key={c.id} value={c.compania}>{c.compania}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                </Grid>                              
                <Grid item xs={12}>
                  <Typography variant='p' sx={{marginRight:2}}>Servicios: </Typography>
                  <FormControlLabel label='Agua' control={<Checkbox/>}/>
                  <FormControlLabel label='Luz' control={<Checkbox/>}/>
                  <FormControlLabel label='Internet' control={<Checkbox/>}/>
                  <FormControlLabel label='Drenaje' control={<Checkbox/>}/>
                  <FormControlLabel label='Aire Acondicionado' control={<Checkbox/>}/>
                </Grid>    
                <Grid item xs={12}>
                  <Typography variant='p'>Fotografias: </Typography><br/>
                  <TextField type='file'/>               
                </Grid>   
                <Grid item xs={12}>
                  <TextField 
                    style={inputsStyle} 
                    label='Descripcion del cuarto' 
                    variant='filled'
                    multiline
                    rows={2} 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}   
                  />
                </Grid> 
                <Grid item xs={12}>
                  <Button                     
                    variant='contained' 
                    fullwidth
                    color='success'
                    endIcon={<DataSaverOnIcon/>}
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
  )
}

export default AggCuarto