import React from 'react';
import { Paper } from '@mui/material';

function Item({item})
{
    return (
        <Paper>          
            <img src={item.imagen} alt={item.titulo} style={{width: '100%', height: '50vh'}}/>
            <div className="desciption" style={{display: 'flex', justifyContent:'center'}}>
                <h2>{item.titulo}</h2>
            </div>
        </Paper>
    )
}

export default Item;