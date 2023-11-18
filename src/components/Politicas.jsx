import React from 'react';
import {
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
}
from '@mui/material';

const Politica = () => {
    return (       
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Box sx={{textAlign: 'center', display:'flex'}}>                       
                    <h4>Politica de Privacidad</h4>                     
                </Box>
                <Typography component={'div'} variant="body1" gutterBottom>
                    Rodrigo Martinez Hernandez, mejor conocido como Room Select, con domicilio en calle Vicente Guerrero, colonia
                    Charco Azul, ciudad Huejutla de Reyes, municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de
                    Hidalgo, país México, y portal de internet room_select@gmail.com, es el responsable del uso y protección de sus
                    datos personales, y al respecto le informamos lo siguiente: <br/><br/>
                    <b>¿Para qué fines utilizaremos sus datos personales?</b><br/>
                    De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que <b>no son
                    necesarias</b> para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:<br/>                
                    <ul type='A'>
                        <li>Garantizar la fiabilidad en el proceso de renta</li>
                        <li>Agilizar el proceso de renta</li>
                        <li>Facilitar el proceso de contacto y firma de contrato</li>
                        <li>Facilitar el acceso de pagos de mensualidades</li>
                        <li>Validar la identidad de los usuarios</li>
                    </ul><br/>                   
                    En caso de que no desee que sus datos personales se utilicen para estos fines secundarios, indíquelo a continuación:<br/>           
                    No consiento que mis datos personales se utilicen para los siguientes fines:<br/>
                    <ul type='A'>
                        <li>Garantizar la fiabilidad en el proceso de renta</li>
                        <li>Agilizar el proceso de renta</li>
                        <li>Facilitar el proceso de contacto y firma de contrato</li>
                        <li>Facilitar el acceso de pagos de mensualidades</li>
                        <li>Validar la identidad de los usuarios</li>
                    </ul><br/>  
                </Typography>
                <Typography component={'div'} variant="body1" gutterBottom>
                    La negativa para el uso de sus datos personales para estas finalidades no podrá ser un motivo para que le neguemos
                    los servicios y productos que solicita o contrata con nosotros.<br/>
                    <b>¿Qué datos personales utilizaremos para estos fines?</b><br/>
                    Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos
                    personales:
                    <ul>
                        <li>Nombre</li>
                        <li>Estado Civil</li>
                        <li>Registro Federal de Contribuyentes(RFC)</li>
                        <li>Clave única de Registro de Población (CURP)</li>
                        <li>Fecha de nacimiento</li>
                        <li>Nacionalidad</li>
                        <li>Teléfono celular</li>
                        <li>Correo electrónico</li>
                        <li>Edad</li>
                        <li>Fotografía</li>
                        <li>Cuentas bancarias</li>
                        <li>Número de tarjetas de crédito</li>
                    </ul>                   
                    Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente aviso de
                    privacidad utilizaremos los siguientes datos personales considerados como sensibles, que requieren de especial
                    protección:
                    <ul>
                        <li>Estado de salud físico presente, pasado o futuro</li>
                        <li>Estado de salud mental presente, pasado o futuro</li>
                        <li>Sexo</li>
                    </ul>               
                    <b>¿Con quién compartimos su información personal y para qué fines?</b><br/>
                    Le informamos que sus datos personales son compartidos dentro del país con las siguientes personas, empresas,
                    organizaciones o autoridades distintas a nosotros, para los siguientes fines:
                </Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Destinatario de los datos personales</TableCell>
                                <TableCell>Finalidad</TableCell>
                                <TableCell>Requiere del consentimiento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">Arrendadores</TableCell>
                                <TableCell>Conocer a los usuarios interesados</TableCell>
                                <TableCell>No</TableCell>
                            </TableRow>
                        </TableBody>                               
                    </Table>
                </TableContainer>
                <Typography component={'div'} variant="body1" gutterBottom>
                    <dl>
                        <dt>Con relación a las transferencias que requieren su consentimiento, si usted después de leer este aviso de privacidad
                        no manifiesta su negativa para que las mismas se lleven a cabo, entenderemos que nos lo ha otorgado. Ponemos a
                        su disposición el siguiente mecanismo para que, en su caso, nos pueda comunicar su negativa para que dichas
                        transferencias se realicen:</dt>
                        <dd>Al aceptar las políticas de privacidad, se otorga el permiso para las transferencias de datos</dd>
                    </dl>
                    <b>¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</b><br/>
                    Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del
                    uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de
                    que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases
                    de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse
                    al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos
                    ARCO.<br/>
                    <dl>
                        <dt>Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del
                        siguiente medio:</dt>
                        <dd>Enviando un correo electrónico a room_select@gmail.com</dd>
                        </dl>
                        <dl>
                            <dt>Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO, ponemos a su disposición el
                            siguiente medio:</dt>
                            <dd>Vía correo electrónico a la dirección antes mencionada</dd>
                        </dl>
                        <br/><br/>
                    Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las
                    solicitudes de derechos ARCO, son los siguientes:<br/>
                    <ul>
                        <li>Nombre de la persona o departamento de datos personales: Jesús David Hernández Hernández</li>
                        <li>Domicilio: calle Vicente Guerrero, colonia Charco Azul, ciudad Huejutla de Reyes, municipio o delegación Huejutla
                        de Reyes, c.p. 43000, en la entidad de Hidalgo, país México</li>
                        <li>Correo electrónico: jhdez47@gmail.com</li>
                    </ul>                
                    <b>Usted puede revocar su consentimiento para el uso de sus datos personales</b><br/>
                    Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos
                    personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su
                    solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir
                    tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su
                    consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su
                    relación con nosotros.<br/>
                    <dl>
                        <dt>Para revocar su consentimiento deberá presentar su solicitud a través del siguiente medio:</dt>
                        <dd>room_select@gmail.com</dd>
                    </dl>
                    <dl>
                        <dt>Para conocer el procedimiento y requisitos para la revocación del consentimiento, ponemos a su disposición el siguiente medio:</dt>
                        <dd>via correo electronico a la direccion antes ya mencionada</dd>
                    </dl>
                    <dl>
                        <dt>Asimismo, usted se podrá inscribir a los siguientes registros, en caso de que no desee obtener publicidad de nuestra parte:</dt>
                        <dd>Registro Público para Evitar Publicidad, para mayor información consulte el portal de internet de la PROFECO</dd>
                    </dl>
                    
                    <b>¿Cómo puede conocer los cambios en este aviso de privacidad?</b><br/>
                    El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos
                    requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras
                    prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.<br/>
                    Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a
                    través de: la página de internet de Room Select.<br/>
                    <dl>
                        <dt>El procedimiento a través del cual se llevarán a cabo las notificaciones sobre cambios o actualizaciones al presente aviso de privacidad es el siguiente:</dt>
                        <dd>Se notificará a los usuarios desde la página principal</dd>
                    </dl>
                    <br/>
                    <small><i>Última actualización: 24/10/2022</i></small>                
                </Typography>    
            </Grid>
        </Box>
    );
};

export default Politica;