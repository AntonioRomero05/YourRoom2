import React from 'react';
import { motion } from 'framer-motion';
import FormLogin from './FormLogin'

const IniciarSesion = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
           <FormLogin/> 
        </motion.div>
    );
};

export default IniciarSesion;