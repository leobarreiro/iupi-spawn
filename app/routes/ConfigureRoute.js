const QuasarValidator = require("../helpers/QuasarValidator");

module.exports = class ConfigureRoute {
	
	constructor(app) {
		this.app = app;
	}

	configure = function() {
		this.app.post('/configure', (req, res) => {
			var validator = new QuasarValidator();
			validator.isValidArtifactId(req.body.artifactId);
			validator.isValidGroupId(req.body.groupId);
			validator.isValidVersion(req.body.version);
			validator.isValidContainer(req.body.container);
			validator.isValidPort(req.body.port);
			if (validator.hasErrors()) {
				res.status(400).send(validator.errors);
			} else {
				res.sendStatus(200);
			}
		});
	}

}
