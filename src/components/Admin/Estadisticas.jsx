import React from 'react'
import AnyChart from 'anychart-react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
          <Box>
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
      id: `horizontal-tab-${index}`,
      'aria-controls': `horizontal-tabpanel-${index}`,
    };
  }
  
  const Estadisticas = () => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', 
              display: 'block', 
              height: 'auto'}}
      >
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="horizontal tabs example"
        >
          <Tab label="Grafico 1" 
            {...a11yProps(0)} 
           />
          <Tab label="Grafico 2" 
            {...a11yProps(1)}
          />
          <Tab label= "Grafico 3" 
            {...a11yProps(2)} 
          />
        </Tabs>
        <TabPanel value={value} index={0}>
            <AnyChart width={500} height={300} title="Tab1 chart" type="pie" data={[5, 3, 3, 5]}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AnyChart legend={true} width={500} height={300} title="Tab2 chart" type="column" data={"P1,5\nP2,3\nP3,6\nP4,4"}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <AnyChart width={500} height={300} title="Tab3 chart" type="line" data={"P1,5\nP2,3\nP3,6\nP4,4"}/>
        </TabPanel>
      </Box>
    );
  }
export default Estadisticas;