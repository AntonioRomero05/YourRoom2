import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Error = ({ message }) => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Alert severity="error">
                <AlertTitle>Algo ha salido mal</AlertTitle>
                {message}
            </Alert>
        </Stack>
    );
};

export default Error;