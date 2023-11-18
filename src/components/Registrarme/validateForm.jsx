class validateForm {
    isValidApellido = (apellido) => {
        const regex = /^[a-zA-Z]{1,15}$/;
        const validApellido = regex.test(apellido);
        return validApellido;
    }

    isValidEmail = (email) => {
        const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isTemporaryEmail = /\b(10minutemail|guerrillamail|tempmail|nefyp)\.com\b/i;
        const isTemporary = isTemporaryEmail.test(email);

        return isValidFormat && !isTemporary;
    }

    isValidPassword = (password) => {
        const hasValidLength = /^.{8,}$/.test(password);
        const hasLowerAndUpperLetters = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
        const hasNumbers = /(?=.*\d)/.test(password);
        const hasSpecialChars = /(?=.*[@$!%*?&])/.test(password);
        
        return hasValidLength && hasLowerAndUpperLetters && hasNumbers && hasSpecialChars;
    }
}

const classValidateForm = new validateForm();
export default classValidateForm;