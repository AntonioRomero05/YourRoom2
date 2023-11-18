import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import { Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from '../../context/authContext';
import ProtectedRoute from '../../components/ProtectedRoutes/ProtectedRoute';
import ProtectedArrendador from '../../components/ProtectedRoutes/ProtectedArrendador';
import ProtectedAdministracion from '../../components/ProtectedRoutes/ProtectedAdministracion';

import Inicio from '../Inicio';
import Cuartos from '../../components/Cuartos';
import Zonas from '../../components/Zonas';
import AcercaDe from '../AcercaDe';
import IniciarSesion from '../../components/Login/IniciarSesion';
import Reset from '../../components/Reset-Password/Reset';
import Politicas from '../../components/Politicas';
import MisCuartos from '../../components/Cuartos/MisCuartos';

import RegistCuarto from '../../components/Cuartos/RegistCuarto';

import MisIngresos from '../../components/Ingresos';
import Contrato from '../../components/Contrato';
import Planes from '../../components/Planes';
import DetalleCuarto from '../../components/DetalleCuarto';
import Evaluacion from '../../components/Evaluacion';
import Quejas from '../../components/Quejas';
import Citas from '../../components/Cuartos/Citas';
import Preguntas from '../Preguntas';
import Error404 from '../Errores/Error-404';
import Error400 from '../Errores/Error-400';
import Error500 from '../Errores/Error-500';
import TipoCuenta from '../TipoCuenta';
import Arrendatario from '../../components/Registrarme/arrendatario/Arrendatario';
import Arrendador from '../../components/Registrarme/arrendador/Arrendador';
import HomeAdmin from '../../components/Admin/HomeAdmin';
import Profile from '../../components/UserInfo/Profile';


const Navegacion = () => {
  const Location = useLocation();
  return (
    <Container fixed sx={{ mb: 12}}>
      <AnimatePresence>
        <AuthProvider>
          <Routes location={Location} key={Location.pathname}>
            <Route path='/cuartos' element={<Cuartos/>}/>
            <Route path='/zonas' element={<Zonas/>}/>
            <Route path='/acercade' element={<AcercaDe/>}/>
            <Route path='/cuenta' element={<TipoCuenta/>}/>
            <Route path='/cuenta/arrendatario' element={<Arrendatario/>}/>
            <Route path='/cuenta/arrendador' element={<Arrendador/>}/>
            <Route path="/administracion" element={
              <ProtectedAdministracion>
                <HomeAdmin/>
              </ProtectedAdministracion>
            }/>
            <Route path='/iniciarsesion' element={<IniciarSesion/>}/>
            <Route path='/recuperacion' element={<Reset/>}/>
            <Route path='/politica' element={<Politicas/>}/>
            <Route path="/miscuartos" element={
              <ProtectedArrendador>
                <MisCuartos />
              </ProtectedArrendador>
            }/>
            <Route path="/miscuartos/ingresos" element={
              <ProtectedArrendador>
                <MisIngresos/>
              </ProtectedArrendador>
            }/>
            <Route path="/miscuartos/contrato" element={
              <ProtectedArrendador>
                <Contrato/>
              </ProtectedArrendador>
            }/>
            <Route path='/quejas' element={<Quejas/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='/perfil' element={<Profile/>}>
            </Route>
            </Route>
            <Route path='/planes' element={<Planes/>}/>
            <Route path='/detallecuarto/:roomId' element={<DetalleCuarto/>}/>
            <Route path='/evaluacion' element={<Evaluacion/>}/>
            <Route path='/miscuartos/citas' element={<Citas/>}/>
            <Route path='/preguntas' element={<Preguntas/>}/>
            <Route path='/RegistCuarto' element={<RegistCuarto/>}/>            
            <Route path='/' element={<Inicio/>}/>
            <Route path='error400' element={<Error400/>}/>
            <Route path='error500' element={<Error500/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes> 
        </AuthProvider>
      </AnimatePresence>
    </Container>
  )
}

export default Navegacion
