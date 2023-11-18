import React from 'react';

import { motion } from 'framer-motion';
import FormRegister from './FormRegister';

const Arrendador = () => {
  return (
    <motion.div
        initial={{width: 0}}
        animate={{width: '100%'}}
        exit={{x: window.innerWidth, transition: {duration: 0.1}}}
    >
      <FormRegister/>  
    </motion.div>
  )
}

export default Arrendador