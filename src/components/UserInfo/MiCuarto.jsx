import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CitasUser from './CitasUser';
import { db } from '../../firebase/Firebase';
import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
import moment from 'moment/moment';
import ContratoCuarto from './ContratoCuarto';
import Cuarto from './Cuarto';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const MiCuarto = () => {
  const [value, setValue] = useState(0);
  const [citaFecha, setCitaFecha] = useState(false);
  const [citaUser, setCitaUser] = useState([]);
  const [citasConfir, setCitasConfir] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const docs = [];
    const q = query(collection(db, "citas"), 
                  where("id_usuario", "==", user.uid),
                  where("estadoCita", "==", "Aceptada"));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setCitaUser(docs);
    }
  };

  useEffect(() => {
    determinaContrato();
  }, [citaUser]);

  const determinaContrato = () => {
    // Obtener fecha actual
    const fechaA = moment();
    const dia = fechaA.date();
    const month = fechaA.month() + 1;
    const año = fechaA.year();
    // Formatear fecha actual
    const fechaActual = moment(`${año}-${month}-${dia}`);
    // Ciclo para obtener fecha de la cita
    const docsC = [];
    for (const doc of citaUser) {
      // Parsear fecha con moment.js
      const fechaSel = moment(doc.fecha); // asegurarse de que el formato de fecha sea el mismo
      // Agregar 3 días
      const nuevaFecha = moment(fechaSel).add(3, 'days');
      if ( fechaActual.isSame(moment(doc.fecha)) || fechaActual.isBetween(fechaSel, nuevaFecha)) {
        docsC.push(doc); // solo agregar el objeto doc a docsC
      }
    }
    if(docsC.length){
      setCitasConfir(docsC);
      console.log(docsC);
      setCitaFecha(true); // establecer citaFecha en verdadero solo si docsC no está vacío
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: 'Mi Cuarto', index: 0 },
    { label: 'Citas', index: 1 },
    { label: 'Contrato', index: 2 },
  ];
  
  const tabsFiltrados = citaFecha ? tabs : tabs.filter(tab => tab.index !== 2);
  
  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', 
            display: {md:'flex', sm: 'block'},
            pt: 2 }}
    >
      <Tabs
        orientation = 'vertical'
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', 
          textAlign: 'center'
        }}
      >
        {tabsFiltrados.map(tab => (
          <Tab key={tab.index} label={tab.label} iconPosition='start' {...a11yProps(tab.index)} />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Cuarto/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <CitasUser/>
      </TabPanel>

      { citaFecha && (
        <TabPanel value={value} index={2}>
          <ContratoCuarto citasConfir={citasConfir}/>
        </TabPanel>
      )}
    </Box>
  );
}

export default MiCuarto