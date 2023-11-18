import moment from "moment/moment";

class ClassValidate {

    validateDate = (fecha) => {
        // Obtener fecha actual
        const fechaA = moment();
        // Reducir 15 años
        const fechaMinimo = moment(fechaA).subtract(15, 'years');
        // Reducir 7 días
        const fechaMaximo = moment(fechaA).subtract(60, 'years');
        if (moment(fecha).isBetween(fechaMaximo, fechaMinimo))
            return true;
        return false;
    }

}

const Validate = new ClassValidate();
export default Validate;