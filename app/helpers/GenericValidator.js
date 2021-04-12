
class GenericValidator {

    constructor() {

    }

	validateBooleanValue(name, value, errors) {
		if (!typeof value === "boolean") {
			errors.push({ field: name, valid: false, message: "must be a boolean" });
		}
	}

	validateAgainstPattern(name, value, pattern, message, errors) {
		if (!pattern.exec(value)) {
			errors.push({ field: name, valid: false, message: message });
		}
	}

}

module.exports = GenericValidator;