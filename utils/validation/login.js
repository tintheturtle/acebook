import Validator from 'validator'
import isEmpty from 'is-empty'

const validateLoginInput = (data) => {
    let errors = {}

    console.log(data)

    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateLoginInput