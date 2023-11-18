import React from 'react';
import { 
    Grid,
    CardMedia,
    Typography 
} from '@mui/material';

const Error400 = () => {
    return (
        <div>
            <Grid
                container
                justify="center"
                direction="column"
                alignItems="center"
                style={{minHeight: '100vh', mt: 3}}
            >
                <Grid item xs={3}>
                    <CardMedia 
                        component="img"
                        height="450"
                        sx={{ width: 369, display: 'block', alignSelf: 'auto' }}
                        image={require('../../assets/error-400.png')}
                    />
                </Grid>
                <Grid>
                    <Typography gutterBottom variant="div" component="div" textAlign={'center'}>
                        <b>SERVICIO NO DISPONIBLE</b><br />
                        Su solicitud no pudo ser procesada. Pruebe mas tarde
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Error400;