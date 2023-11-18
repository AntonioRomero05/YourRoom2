import React, {useState, Fragment} from 'react'
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { Drawer, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { styled, useTheme } from '@mui/material/styles';

import { Home, Room, Bed, Info, PersonAddAlt ,Login } from '@mui/icons-material';
import AccountCircle  from '@mui/icons-material/AccountCircle';
import WeekendIcon from '@mui/icons-material/Weekend';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAuth } from "../../context/authContext";
import RoomDataService from '../../components/Cuartos/room.servicies';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const getUser = async(id) => {
        const docSnapUser = await RoomDataService.getUser(id);
        return docSnapUser.data();
    }

    const handleCloseRooms = async() => {
        setOpenDrawer(false)
        let userA = await getUser(user.uid);
        if(userA.rol === 'Arrendador'){
            navigate("/miscuartos"); 
        }else{
            navigate("/micuarto");
        }
    };

    const handleCloseSesion = async() => {
        setOpenDrawer(false);
        try{
            await logout();
            navigate("/iniciarsesion");
        } catch(error){
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <Drawer 
                anchor="right"
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                open={openDrawer} 
                onClose={()=>setOpenDrawer(false)}
            >
                <DrawerHeader>
                    <IconButton onClick={()=> setOpenDrawer(false)}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton onClick={()=> setOpenDrawer(false)}
                        component={RouterLink}
                        to='/'>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText>INICIO</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=> setOpenDrawer(false)}
                        component={RouterLink}
                        to='/cuartos'>
                        <ListItemIcon><Bed/></ListItemIcon>
                        <ListItemText>CUARTOS</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=> setOpenDrawer(false)} 
                        component={RouterLink}
                        to='/zonas'>
                        <ListItemIcon><Room/></ListItemIcon>
                        <ListItemText>ZONAS</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={()=> setOpenDrawer(false)} 
                        component={RouterLink}
                        to='/acercade'>
                        <ListItemIcon><Info/></ListItemIcon>
                        <ListItemText>ACERCA DE</ListItemText>
                    </ListItemButton>
                    <Divider />
                    {user != null ? <>
                        <ListItemButton onClick={()=> setOpenDrawer(false)} 
                            component={RouterLink}
                            to='perfil'>
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText>Perfil</ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={handleCloseRooms}>
                            <ListItemIcon><WeekendIcon/></ListItemIcon>
                            <ListItemText>Mis cuartos</ListItemText>
                        </ListItemButton>
                        <ListItemButton onClick={handleCloseSesion}>
                            <ListItemIcon><LogoutIcon/></ListItemIcon>
                            <ListItemText>Cerrar Sesión</ListItemText>
                        </ListItemButton>
                    </>:
                        <>
                            <ListItemButton onClick={()=> setOpenDrawer(false)} 
                                component={RouterLink}
                                to='/registrarme'>
                                <ListItemIcon><PersonAddAlt/></ListItemIcon>
                                <ListItemText>REGISTRARME</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={()=> setOpenDrawer(false)} 
                                component={RouterLink}
                                to='/iniciarsesion'>
                                <ListItemIcon><Login/></ListItemIcon>
                                <ListItemText>INICIAR SESION</ListItemText>
                            </ListItemButton>
                        </>
                    }
                    <Divider/>
                </List>
            </Drawer>
            <IconButton sx={{color:'white', marginLeft: 'auto'}} onClick={()=> setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </Fragment>
    )
}
export default DrawerComp