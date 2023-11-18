import { Selector } from 'testcafe';

fixture`Prueba de existencia de etiqueta por ID en Cuartos`
    .page`http://url_de_tu_componente`;

test('Verificar la existencia de una etiqueta con un ID específico', async t => {
    const specificElement = Selector('#emailHelp'); // Cambia 'emailHelp' por el ID real de tu etiqueta

    // Verificar si la etiqueta con el ID especificado existe en la página
    await t.expect(specificElement.exists).ok();
});