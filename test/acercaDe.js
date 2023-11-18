import { Selector } from 'testcafe';

fixture `Acerca de nosotros`
    .page `https://your-room-9e781.web.app/acercade`; // Reemplaza <URL_DE_TU_APP_AQUÍ> con la URL de tu aplicación

    test('Verificar contenido de la página Acerca de nosotros', async t => {
        const tituloQuienesSomos = Selector('.MuiTypography-h5').withText('¿Quienes somos?');
        const contenidoQuienesSomos = Selector('.MuiTypography-body2').withText('Nosotros somos una empresa con el objetivo de facilitar la busqueda de cuartos para rentar');
    
        const tituloVision = Selector('.MuiTypography-h5').withText('Vision');
        const contenidoVision = Selector('.AcercaDe_vision__29gsY').withText('Convertirse en el mejor servicio para promocion y busqueda de espacios de renta de Huejutla de Reyes Hidalgo');
    
        const tituloMision = Selector('.MuiTypography-h5').withText('Misión');
        const contenidoMision = Selector('.AcercaDe_mision__V+8Jk').withText('Crear una plataforma de rentas no solo para los que buscan si no tambien para lo que desea ofrecer este servicio.');
    
        await t
            .expect(tituloQuienesSomos.exists).ok()
            .expect(contenidoQuienesSomos.exists).ok()
            .expect(tituloVision.exists).ok()
            .expect(contenidoVision.exists).ok();
    });
