const {Selector} = require("testcafe");

fixture`FormResetEmail`.page("https://your-room-9e781.web.app/recuperacion")

test("Validacion de envio de recuperacion de cuenta", async (t) =>{
    const emailInput = Selector('#txtEmail');
    const enviarBoton = await Selector('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-fullWidth').withText('ENVIAR');
    const captcha = await Selector('.rc-anchor.rc-anchor-normal.rc-anchor-light');
    const successComponent = Selector('.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.MuiAlertTitle-root').withText('Todo bien');
    const iframeSelector = Selector('iframe');

    await t.expect(emailInput.exists).ok();
    await t.expect(enviarBoton.exists).ok();

    await t
    .typeText("#txtEmail","rodrigo.matz.hdez.34@gmail.com")
    .expect(enviarBoton.hasAttribute('disabled')).ok()
    .wait(6000);
    if (await iframeSelector.exists) {
        await t.switchToIframe(iframeSelector);
    }
    await t.click('#recaptcha-anchor');
    if (await iframeSelector.exists) {
        await t.switchToMainWindow();
    }
    //await t.wait(10000);
    //await t.expect(enviarBoton.hasAttribute('disabled')).notOk();
    //await t.click(enviarBoton)
    //.expect(successComponent.exists);
});