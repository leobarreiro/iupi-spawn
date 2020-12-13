
module.exports = class QuasarValidator {
	
	constructor() {
		this.errors = [];
	}

	isValidGroupId = function(value) {

	}

	isValidArtifactId = function(value) {
		var pattern = /^[a-z]{1,}[\-]{0,1}[a-z]{1,}$/g;
		this.validateAgainstPattern("artifactId", value, pattern, "must contain only lowercase letters (from a to z) and perhaps may contain a dash");
	}

	validateAgainstPattern = function(name, value, pattern, message) {
		if (!pattern.exec(value)) {
			this.errors.push({ field: name, valid: false, message: message });
		}
	}

	hasErrors = function() {
		return this.errors.length > 0;
	}

}