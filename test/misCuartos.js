import { Selector } from 'testcafe';

fixture`Prueba de existencia en Cuartos`
    .page`https://your-room-9e781.web.app/miscuartos`;

test('Verificar la existencia de elementos en la página', async t => {
        const metaDescription = Selector('meta[name="description"]');
        const linkToManifest = Selector('link[rel="manifest"]');
        const rootDiv = Selector('#root');
        const noscript = Selector('noscript');
    
        await t
            .expect(metaDescription.exists).ok()
            .expect(linkToManifest.exists).ok()
            .expect(rootDiv.exists).ok()
            .expect(noscript.exists).ok();
});
