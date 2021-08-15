const GenericValidator = require("./GenericValidator");

class ApiValidator {
	
	constructor() {
		this.genericValidator = new GenericValidator();
	}

	isValidPort(value, errors) {
		var pattern = /^[0-9]{4}$/g;
		this.genericValidator.validateAgainstPattern("port", value, pattern, "must contain only numbers, using the format [nnnn]", this.errors, errors);
	}

	isValidContainer(value, errors) {
		var pattern = /^(tomcat|undertow|jetty)$/g;
		this.genericValidator.validateAgainstPattern("container", value, pattern, "must be under a valid option [undertow|tomcat|jetty]", errors);
	}

	isValidVersion(value, errors) {
		var pattern = /^[0-9]{1,}[\.]{1}[0-9]{1,}[\.]{1}[0-9]{1,}$/g;
		this.genericValidator.validateAgainstPattern("version", value, pattern, "must be on semantic versioning format (semver.org) => n.n.n", errors);
	}

	isValidGroupId(value, errors) {
		var pattern = /^[a-z]{2,3}([\.]{1}[a-z]{2,3}){0,1}([\.]{1}[a-z]{1,}[a-z0-9]{1,}[_-]{0,1}[a-z0-9]{1,}){1,}$/g;
		this.genericValidator.validateAgainstPattern("groupId", value, pattern, "must contain only lowercase letters (from a to z) and dots.", errors);
	}

	isValidArtifactId(value, errors) {
		var pattern = /^[a-z]{1,}[\-]{0,1}[a-z]{1,}$/g;
		this.genericValidator.validateAgainstPattern("artifactId", value, pattern, "must contain only lowercase letters (from a to z) and perhaps may contain a dash", errors);
	}

	isValidAmqp(value, errors) {
		var pattern = /^(kafka|rabbit|mqtt|none)$/g;
		this.genericValidator.validateAgainstPattern("amqp", value, pattern, "must be under a valid option [kafka|rabbit|mqtt|none]", errors);
	}

	isValidDatabase(value, errors) {
		var pattern = /^(postgres|oracle|mysql|none)$/g;
		this.genericValidator.validateAgainstPattern("database", value, pattern, "must be under a valid option [postgres|oracle|mysql|none]", errors);
	}

	isValidNosql(value, errors) {
		var pattern = /^(mongo|redis|none)$/g;
		this.genericValidator.validateAgainstPattern("nosql", value, pattern, "must be under a valid option [mongo|redis|none]", errors);
	}

	isValidCache(value, errors) {
		var pattern = /^(caffeine|redis|none)$/g;
		this.genericValidator.validateAgainstPattern("cache", value, pattern, "must be under a valid option [caffeine|redis|none]", errors);
	}

	isValidOpenapi(value, errors) {
		this.genericValidator.validateBooleanValue("openapi", value, errors);
	}

	isValidDevtools(value, errors) {
		this.genericValidator.validateBooleanValue("devtools", value, errors);
	}

	isValidActuator(value, errors) {
		this.genericValidator.validateBooleanValue("actuator", value, errors);
	}

}

module.exports = ApiValidator;