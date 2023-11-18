import React from 'react';
import { motion } from 'framer-motion';
import { AddCircleOutline} from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import '../index.css';

const Preguntas = () => {
    return (
        <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{x: window.innerWidth, transition: {duration: 0.1}}}
        >
            <h1 class="titulo">Preguntas Frecuentes</h1>
            <Typography variant="h6" gutterBottom>
                Habitacion
            </Typography>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>¿Cómo puedo apartar una habitación?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Manejamos un apartado con $1,000 los cuales entran en concepto de anticipo, este apartado dura hasta una 
                    semana sin generar cargos de renta por lo que podrás coordinarte con tu asesor para la fecha en que mas sea 
                    de tu conveniencia para ingresar a tu nueva habitación.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>¿Puedo llevar visita?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Las visitas si están permitidas, en caso de que se quieran quedar a dormir existe un numero de 5 noches como 
                    máximo por mes para no generar gastos adicionales.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>¿Se permite tener mascotas?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Únicamente están permitidas mascotas pequeñas que puedan estar en jaulas o peceras, si tienes duda consulta con tu
                    asesor al respecto ya que en ocasiones alguna habitaciones cuentan con su propia terraza lo que podría facilitar excepciones.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>¿Puede vivir alguien mas en mi cuarto?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Si esta permitido, máximo dos personas por habitación, es importante que antes de cualquier movimiento lo platiques con tu asesor 
                    ya que esto generaría un incremento en tu mensualidad.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>¿Cuál es la estancia mínima?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    6 meses, sin embargo existen situaciones en las que podemos ajustarnos específicamente a tus necesidades, te recomendamos platicar de 
                    este tema con tu asesor.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <br/>
            <Typography variant="h6" gutterBottom>
                Metodos de pago
            </Typography>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                <Typography>¿Qué formas de pago manejan?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    <ul type='A'>
                        <li>Deposito bancario en ventanilla.</li>
                        <li>Transferencia interbancaria (Internet)</li>
                        <li>Pago en OXXO.</li>
                    </ul><br/>     
                </Typography>
                </AccordionDetails>
            </Accordion>
            <br/>
            <Typography variant="h6" gutterBottom>
                Sanciones
            </Typography>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                <Typography>¿Existen cobros adicionales?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    No, los únicos cobros adicionales que se podrían generar dependen de tu cuidado ante el mobiliario de la casa o tus decisiones 
                    al contratar o mejorar algún aspecto personal o de servicio adicional no incluido en la renta de habitación, como por ejemplo  
                    pudiera ser un cajón de estacionamiento que es opcional y sujeto a disponibilidad.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{width: 600}}>
                <AccordionSummary
                    expandIcon={<AddCircleOutline />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                <Typography>¿Qué pasa si no cumplo mi estancia contratada?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Dentro de los requisitos de ingreso a hospedaje no se pide firma de pagare, aval o fiador, la meses contratados no son con pago forzoso 
                    por lo que la única penalización es la perdida del deposito.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </motion.div>
    );
};

export default Preguntas;
                