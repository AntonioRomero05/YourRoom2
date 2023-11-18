import { Selector } from 'testcafe';

fixture`Pruebas de Your Room`
    .page`https://your-room-9e781.web.app/`; // Reemplaza con tu URL real

test('Verificar la existencia de elementos en la página', async t => {
    await t
        .expect(Selector('h6').withText('Your Room').exists).ok()
        .expect(Selector('a').withText('Inicio').exists).ok()
        .expect(Selector('img[alt="Cuarto 1"]').exists).ok()
        .expect(Selector('img[alt="Cuarto 2"]').exists).ok()
        .expect(Selector('img[alt="Cuarto 3"]').exists).ok()
        .expect(Selector('img[alt="Cuarto 4"]').exists).ok()
        .expect(Selector('a[href="/contacto"]').exists).ok()
        .expect(Selector('a[href="/soporte"]').exists).ok()
        .expect(Selector('a[href="/avisolegal"]').exists).ok()
        .expect(Selector('a[href="/politica"]').exists).ok()
        .expect(Selector('a[href="/cookies"]').exists).ok()
        .expect(Selector('a[href="/preguntas"]').exists).ok()
        .expect(Selector('a[href="/iniciarsesion"]').exists).ok()
        .expect(Selector('a[href="/cuenta"]').exists).ok()
});
