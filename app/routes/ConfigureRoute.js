let ApiConf = require("../requests/ApiConf");

module.exports = class ConfigureRoute {
	
	constructor(app) {
		this.app = app;
	}

	configure = function() {
		this.app.post('/configure', (req, res) => {
			var apiConf = new ApiConf(req.body);
			console.log(apiConf);
			if (apiConf.isValid()) {
				res.sendStatus(200);
			} else {
				res.status(400).send(apiConf.validator.errors);
			}
		});
	}

}
