import React, {useState} from 'react';
import { useAuth } from "../../context/authContext";
import { motion } from 'framer-motion';
import { Box, Grid, Typography, Button, } from '@mui/material';
import { AttachMoney, Description, Event } from '@mui/icons-material';
import { NavLink as RouterLink} from "react-router-dom";

// import AggCuarto from './AggCuarto';
import AddCuartos from './AddCuartos';
import RoomList from './RoomList';

const MisCuartos = () => {
    const { user } = useAuth();
    // console.log(user)
    const [roomId, setRoomId] = useState("");
    const getRoomHandler = (id) => {
        setRoomId(id);
    }
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16} alignItems='center' justifyContent= {'center'}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
                            Mis Publicaciones
                        </Typography>
                        <Box textAlign='right'>                          
                            <AddCuartos id={roomId} setRoomId={setRoomId} user={user.uid}/>
                        </Box>
                        <RoomList getRoomId={getRoomHandler} user={user.uid}/>
                        <Box textAlign='right' paddingTop={2}>
                            <Button
                                sx={{color:'black'}}
                                endIcon={<AttachMoney sx={{width: 25, height: 25}}/>}
                                component={RouterLink}
                                to='/miscuartos/ingresos'
                            >
                                Ir a mis ingresos
                            </Button>
                        </Box>
                        <Box textAlign='right' paddingTop={2}>
                            <Button
                                sx={{color:'black', marginLeft: 'auto'}}
                                startIcon={<Description/>}
                                component={RouterLink}
                                to='/miscuartos/contrato'
                            >
                                Contrato
                            </Button>
                            <Button
                                sx={{color:'black', marginLeft: 2}}
                                startIcon={<Event/>}
                                component={RouterLink}
                                to='/miscuartos/citas'
                            >
                                Citas
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box> 
        </motion.div>
        
    );
};

export default MisCuartos;