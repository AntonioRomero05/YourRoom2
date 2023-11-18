import { Selector } from 'testcafe';

fixture`Prueba de existencia en Cuartos`
    .page`https://your-room-9e781.web.app/cuartos`;

    test('Prueba de existencia de etiquetas en el componente Cuartos', async t => {
        await t
            .wait(5000)
            .expect(Selector('h6').withText('Encuentra tu habitacion ideal').exists).ok()
            .expect(Selector('input[type="text"]').exists).ok()
            .expect(Selector('img').exists).ok()
    });