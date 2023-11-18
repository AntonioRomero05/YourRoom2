import React from 'react';
import {
    Typography,
    Button,
    Link,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material/';
import AlertPolitica from './AlertPolitica';

const Ventana = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>          
            <Typography variant='div'>
                Acepto la <Link variant="outlined" onClick={handleClickOpen}> Politica de privacidad</Link>
            </Typography>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"¿Aceptas los terminos y condiciones?"}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description" component={'div'}>
                        <AlertPolitica/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Rechazar</Button>
                    <Button onClick={handleClose} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Ventana;