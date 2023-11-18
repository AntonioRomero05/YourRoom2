import React, {useState, useEffect} from 'react'
import { CardMedia, Typography, Box, Button, Grid, TextField } from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import TableBackups from './TableBackups';
import classBackup from './backups.services';
import BackupColecction from './BackupColecction';

const Respaldos = () => {
  const [allBackups, setAllBackups] = useState([]);
  const [dayNow, setDayNow] = useState(""); 

  const getBackups = async() => {
    const data = await classBackup.getAllBackups();
    setAllBackups(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() => {
    getBackups();
    var moment = require('moment');
    var now = moment().format("YYYY-MM-DD");
    console.log(now);
    setDayNow(now);
  }, []);

  const refreshBackups = () =>{
    getBackups();
  }

  return (
    <div>
      <Typography variant="h6" color="initial">
        Configuracion
      </Typography><br />
      <CardMedia
        component="img"
        height="auto"
        sx={{ width: 800, display: 'block', alignSelf: 'auto'  }}
        image={require('../respaldo1.png')}
        alt="Respaldos"
      /> <br />
      <Box sx={{display:'flex', justifyContent: 'flex-start', paddingBottom: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}> 
            <BackupColecction setRefresh={refreshBackups}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="initial">
              Programar Respaldo
            </Typography>
            <TextField
              required
              fullWidth
              autoFocus
              title="Indique la fecha"  
              id="date"
              label="Fecha de respaldo"
              type="date"
              defaultValue={dayNow}
              sx={{ width: 267, mt:2,  marginRight: 1}}
              InputLabelProps={{
                shrink: true,
              }}
              name='fechaBackup'
                // onChange={(e) => setUser({ ...user, nacimiento: e.target.value })}
            /><br/>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              startIcon={<BackupIcon/>} 
              sx={{height:35, mt:1}}
            >
              Respaldar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6" color="initial" sx={{mt:2}}>
        Historial de respaldos
      </Typography>
      <Box sx={{height: 280, width: '100%', mb: 2}}>
        <TableBackups allBackups={allBackups}/>
      </Box>
    </div>
  );
};

export default Respaldos;