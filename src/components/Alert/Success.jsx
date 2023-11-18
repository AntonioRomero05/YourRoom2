import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Success = ({ message }) => {
    return (
        <Stack sx={{ width: '100%' }}>
            <Alert severity="success">
                <AlertTitle>Todo bien</AlertTitle>
                {message}
            </Alert>
        </Stack>
    );
};

export default Success;