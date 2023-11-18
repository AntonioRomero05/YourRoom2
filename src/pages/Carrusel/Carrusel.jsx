import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import Slider from './Slider.json';

function Carrusel()
{
    return (
        <Carousel sx={{mt:1}}>
            {
                Slider.map( item => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default Carrusel;