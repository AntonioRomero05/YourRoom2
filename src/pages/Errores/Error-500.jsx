import React from 'react';
import { 
    Grid,
    CardMedia,
    Typography 
} from '@mui/material';

const Error500 = () => {
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
                        image={require('../../assets/error-500.png')}
                    />
                </Grid>
                <Grid>
                    <Typography gutterBottom variant="div" component="div" textAlign={'center'}>
                        <b>SERVICIO NO DISPONIBLE</b><br />
                        La información que solicitas no se encuentra disponible. Prueba mas Tarde :)
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Error500;