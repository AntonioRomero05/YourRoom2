import React from 'react';
import Carrusel from './Carrusel/Carrusel';
import { Box} from '@mui/material'
import { motion } from 'framer-motion';

const Inicio = () => {
  return (
    <motion.div
      initial={{width: 0}}
      animate={{width: '100%'}}
      exit={{x: window.innerWidth, transition: {duration: 0.1}}}
    >
      <Box sx={{width: '80%', marginLeft:10}}>
        <Carrusel/>
      </Box>
    </motion.div>
  );
};

export default Inicio;