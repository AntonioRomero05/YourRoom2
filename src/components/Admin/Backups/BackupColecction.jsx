import React, {useState} from 'react';
import { Typography, Box, Button} from '@mui/material'
import BackupIcon from '@mui/icons-material/Backup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { db } from '../../../firebase/Firebase';
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadString  } from "firebase/storage";
import { v4 } from 'uuid';
import Error from '../../Alert/Error';
import Success from '../../Alert/Success';
import classBackup from './backups.services';

const BackupColecction = ({setRefresh}) => {
    const [coleccionDb, setColeccion] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    const [backup, setBackup] = useState({
        coleccion: ""
    });

    const SubmitCollection = async(e) => {
        e.preventDefault();
        const col = backup.coleccion;
        let file = "";

        if(col === "usuarios"){
            file = "Users";
        }else if(col === "rooms"){
            file = "Rooms";
        }else if(col === "citas"){
            file = "Citas";
        }

        try{
            if(file !== ""){
                const collectionRef = collection(db, col);
                const querySnapshot = await getDocs(collectionRef); 
                const data = querySnapshot.docs.map((doc) => doc.data());
                const jsonData = JSON.stringify(data);
                const storage = getStorage();
                const storageRef = ref(storage, "Backups/" + file +"/" + v4() + ".json");
                const result = await uploadString(storageRef, jsonData, "raw");
                const name = result.metadata.name;
                const size = result.metadata.size;
                const date = result.metadata.timeCreated;
                const newBackup = {
                    file,
                    name,
                    size,
                    date
                };
                await classBackup.addBackup(newBackup);
                setRefresh();
                setSuccess("La coleccion ha sido respaldada");
                setError("");
            }
        } catch(error){
            setError("Ha ocurrido un error al intentar respaldar la coleccion");
            setSuccess("");
        }
    }

    return (
        <>
            <Typography variant="h6" color="initial">
              Respaldar coleccion
            </Typography>
            <Box component="form" onSubmit={SubmitCollection} sx={{mb:1 }}>
              <FormControl sx={{ mt: 2, width: 250}}>
                <InputLabel id="demo-simple-select-label">Coleccion a respaldar</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Coleccion a respaldar"
                  name="coleccion"
                  value={coleccionDb}
                  onChange={(e) => {
                    setColeccion(e.target.value);
                    setBackup({ ...backup, coleccion: e.target.value });
                  }}
                >
                    <MenuItem value={'usuarios'}>Usuarios</MenuItem>
                    <MenuItem value={'rooms'}>Cuartos</MenuItem>
                    <MenuItem value={'citas'}>Citas</MenuItem>
                </Select>
              </FormControl><br/>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                startIcon={<BackupIcon/>} 
                sx={{height:35, mt:1}}
              >
                Guardar
              </Button>
            </Box>
            {error && <Error message={error} />}
            {success && <Success message={success} />}
        </>
    );
};

export default BackupColecction;