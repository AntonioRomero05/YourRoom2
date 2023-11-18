import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaUsers, FaClinicMedical, FaChartBar, FaSave } from 'react-icons/fa';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { MdReport } from 'react-icons/md'
import Usuarios from './Usuarios';
import Publicaciones from './Publicaciones';
import Estadisticas from './Estadisticas';
import Respaldos from './Backups/Respaldos';
import NavPermisos from './Permisos/NavPermisos';

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
        <Box sx={{ p: 3
                }}>
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

const HomeAdmin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', 
            display: {md:'flex', sm: 'block'},
            pt: 4 }}
    >
      <Tabs
        orientation = 'vertical'
        // orientation = {{md: 'vertical', sm:'horizontal'}}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', 
          textAlign: 'center'
        }}
        align="right" 
      >
        <Tab 
          label="Usuarios" 
          icon={<FaUsers size={20}/>}
          iconPosition="start"
          {...a11yProps(0)} 
         />
         <Tab label="Permisos de navegacion" 
          icon={<AdminPanelSettingsIcon size={20}/>}
          iconPosition="start"
          {...a11yProps(1)} 
         />
        <Tab label="Publicaciones" 
          icon={<FaClinicMedical size={20}/>}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab label= "Estadisticas" 
          icon={<FaChartBar size={20}/>}
          iconPosition="start"
          {...a11yProps(3)} 
        />
        <Tab label= "Quejas" 
          icon={<MdReport size={20}/>}
          iconPosition="start"
          {...a11yProps(4)} 
        />
        <Tab label= "Respaldos" 
          icon={<FaSave size={20}/>}
          iconPosition="start"
          {...a11yProps(5)} 
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Usuarios/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NavPermisos/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Publicaciones/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Estadisticas/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Respaldos/>
      </TabPanel>
    </Box>
  );
}
export default HomeAdmin;