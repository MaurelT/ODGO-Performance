export const validators = {
    validateFirstName: (first_name) => {
        if (
            /^[a-zA-Z0-9]{2,255}/.test(first_name)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateLastName: (last_name) => {
        if (
            /^[a-zA-Z0-9]{2,255}/.test(last_name)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateAdress: (adress) => {
        if (
            /^.{1,255}/.test(adress)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateVille: (ville) => {
        if (
            /^[a-zA-Z0-9]{2,255}/.test(ville)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateCodePostal: (code_postal) => {
        if (
            /^[0-9]{1,10}/.test(code_postal)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateEMail: (e_mail) => {
        if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e_mail)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validatePhoneNumber: (phone_number) => {
        if (
            /^[0-9]{1,100}/.test(phone_number)
        ) {
            return true
        }
        else {
            return false
        }
    },
    // validateDialerID = () => { }
    validatePassword: (password) => {
        // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$ => Minimum eight characters, at least one letter, one number and one special character:
        // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$ => Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
        // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$ => Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        // ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$ => Minimum eight characters, at least one letter and one number:
        if (
            /^[0-9]{4,6}$/.test(password)
        ) {
            return true
        }
        else {
            return false
        }
    },
    validateConfirmPassword: (confirm_password, password) => {
        if (
            /^[0-9]{4,6}$/.test(password) &&
            /^[0-9]{4,6}$/.test(confirm_password) &&
            confirm_password === password
        ) {
            return true
        }
        else {
            return false
        }
    }
}