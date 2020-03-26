import Validator from 'validator'
import isEmpty from 'is-empty'

const validateRegisterInput = (data) => {
    let errors = {}

    console.log(data.description)
    
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""
    data.ACE = !isEmpty(data.ACE) ? data.ACE : ""
    data.description = !isEmpty(data.description) ? data.description : ""
    data.introversion = !isEmpty(data.introversion) ? data.introversion : ""

    // Name Checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required."
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required.";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required.";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters.";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match.";
    }

    // ACE Application Checks
    if (Validator.isEmpty(data.description)) {
        errors.description = "Please describe yourself.";
    }
    if (Validator.isEmpty(data.ACE)) {
        errors.ACE = "Must declare status as big or little.";
    }
    if (Validator.isEmpty(data.introversion)) {
        errors.introversion = "Please choose one.";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateRegisterInput