import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Panel = (props) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tipo de Usuario</StyledTableCell>
                            <StyledTableCell align="right">Mis Cuartos</StyledTableCell>
                            <StyledTableCell align="right">Quejas</StyledTableCell>
                            <StyledTableCell align="right">Contrato</StyledTableCell>
                            <StyledTableCell align="right">Administracion</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                
                        {props.users.map((doc) => { 
                            return (
                                <StyledTableRow key={doc.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {doc.TipoUsuario}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <FormControlLabel
                                            sx={{
                                                display: 'block',
                                            }}
                                            control={
                                                <Switch
                                                    name="loading"
                                                    color="primary"
                                                />
                                            }
                                            checked={doc.Cuartos} onChange={e => props.onChange(doc.id, 'Cuartos', e.target.checked)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <FormControlLabel
                                            sx={{
                                                display: 'block',
                                            }}
                                            control={
                                                <Switch
                                                    name="loading"
                                                    color="primary"
                                                />
                                            }
                                            checked={doc.Quejas} onChange={e => props.onChange(doc.id, 'Quejas', e.target.checked)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <FormControlLabel
                                            sx={{
                                                display: 'block',
                                            }}
                                            control={
                                                <Switch
                                                    name="loading"
                                                    color="primary"
                                                />
                                            }
                                            checked={doc.Contrato} onChange={e => props.onChange(doc.id, 'Contrato', e.target.checked)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <FormControlLabel
                                            sx={{
                                                display: 'block',
                                            }}
                                            control={
                                                <Switch
                                                    name="loading"
                                                    color="primary"
                                                />
                                            }
                                            checked={doc.Administracion} onChange={e => props.onChange(doc.id, 'Administracion', e.target.checked)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}  
                    </TableBody>
                </Table>
            </TableContainer>
        </> 
    );
};

export default Panel;