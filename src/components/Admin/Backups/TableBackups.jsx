import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
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

const TableBackups = (props) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Estado</StyledTableCell>
                            <StyledTableCell>Colección</StyledTableCell>
                            <StyledTableCell>Nombre del archivo</StyledTableCell>
                            <StyledTableCell>Tamaño</StyledTableCell>
                            <StyledTableCell>Fecha de subida</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                
                        {props.allBackups.map((doc) => { 
                            return (
                                <StyledTableRow key={doc.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <VerifiedIcon/> Completado
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doc.file}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doc.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doc.size}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {doc.date}
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

export default TableBackups;