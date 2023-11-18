import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Container} from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
});

const Breadcrumb = () => {
    const location = useLocation()
    const navigate = useNavigate();    
    let currenLink = ''
    
    const handleClick = (e, crumbValue) => {
        e.preventDefault();
        console.info(`You clicked on the breadcrumb: ${crumbValue}`);
        navigate(crumbValue);
    };

    const handleHome = (e) => {
        e.preventDefault();
        navigate("/");
    };
      
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map( crumb => {
            currenLink = currenLink + "/" + crumb;
            return (
            <div className="crumb" key={crumb} underline='none'>
                <StyledBreadcrumb
                    component="a"
                    href={currenLink}
                    label={crumb}
                    onClick={(e) => handleClick(e, crumb)}
                />
            </div>
            )
    })

    return (
        <Container maxWidth='lg' sx={{maxWidht: 800, mt:12, mb:2}}>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    <StyledBreadcrumb
                        component="a"
                        href="/"
                        label="Inicio"
                        icon={<HomeIcon fontSize="small" />}
                        onClick={handleHome}
                    />
                    {crumbs}                 
                </Breadcrumbs>
            </div>
        </Container>
    );
};

export default Breadcrumb;