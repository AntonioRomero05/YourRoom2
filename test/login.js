const {Selector} = require("testcafe");

fixture`Inicio de sesion`.page("https://your-room-9e781.web.app/iniciarsesion")

test("Validacion de inicio de sesion", async (t) =>{
    const botonEntrar = await Selector('.MuiButton-contained.MuiButton-containedPrimary.MuiButton-fullWidth').withText('ENTRAR');;
    const titulo = await Selector('.MuiTypography-root.MuiTypography-h6.MuiTypography-gutterBottom.css-adrpgk').withText('Mis Publicaciones');

    await t
    .typeText("#txtEmail","rodrigo.matz.hdez.34@gmail.com")
    .typeText("#txtPassword", "1234567")
    .click(botonEntrar)
    .expect(Selector(titulo).innerText).eql("Mis Publicaciones");
});