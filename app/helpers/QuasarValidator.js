
class QuasarValidator {
	
	constructor() {
		this.errors = [];
	}

	isValidPort(value) {
		var pattern = /^[0-9]{4}$/g;
		this.validateAgainstPattern("port", value, pattern, "must contain only numbers, using the format [nnnn]");
	}

	isValidContainer(value) {
		var pattern = /^(tomcat|undertow|jetty)$/g;
		this.validateAgainstPattern("container", value, pattern, "must be under a valid option [undertow, tomcat, jetty]");
	}

	isValidVersion(value) {
		var pattern = /^[0-9]{1,}[\.]{1}[0-9]{1,}[\.]{1}[0-9]{1,}$/g;
		this.validateAgainstPattern("version", value, pattern, "must be on semantic versioning format (semver.org) => n.n.n");
	}

	isValidGroupId(value) {
		var pattern = /^[a-z]{2,}[\.]{1}([a-z]{2,}[\.]{1}){1,}[a-z]{1,}$/g;
		this.validateAgainstPattern("groupId", value, pattern, "must contain only lowercase letters (from a to z) and dots.");
	}

	isValidArtifactId(value) {
		var pattern = /^[a-z]{1,}[\-]{0,1}[a-z]{1,}$/g;
		this.validateAgainstPattern("artifactId", value, pattern, "must contain only lowercase letters (from a to z) and perhaps may contain a dash");
	}

	validateAgainstPattern(name, value, pattern, message) {
		if (!pattern.exec(value)) {
			this.errors.push({ field: name, valid: false, message: message });
		}
	}

	hasErrors() {
		return this.errors.length > 0;
	}

}

module.exports = QuasarValidator;