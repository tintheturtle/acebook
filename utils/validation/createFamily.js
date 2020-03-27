import Validator from 'validator'
import isEmpty from 'is-empty'

const validateFamilyInput = (data) => {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ""
    data.name = !isEmpty(data.name) ? data.name : ""

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email list is required";
    } 
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "A temporary name is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateFamilyInput