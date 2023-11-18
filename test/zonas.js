import { Selector } from 'testcafe';

fixture`Prueba de Renderizado`.page`https://your-room-9e781.web.app/zonas`;

test('Prueba de renderizado de componentes', async (t) => {
    // Escribe tu lógica de prueba aquí
    await t
        .expect(Selector('h3').innerText).eql('Zona de Recidencias')
        .expect(Selector('img').count).eql(6)
        .expect(Selector('Button').exists).ok();
});
