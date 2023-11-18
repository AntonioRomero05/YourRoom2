import React from 'react';
import { 
    Grid,
    CardMedia,
    Typography 
} from '@mui/material';

const Error404 = () => {
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
                        image={require('../../assets/error-404.jpg')}
                    />
                </Grid>
                <Grid>
                    <Typography gutterBottom variant="div" component="div" textAlign={'center'}>
                        <b>SITIO NO ENCONTRADO</b><br />
                        La pagina que estas buscando no se encuentra disponible o fue movido a otro directorio.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Error404;