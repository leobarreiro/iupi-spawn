let ApiConfiguration = require("../requests/ApiConfiguration");
let GeneratorService = require("../services/GeneratorService");
var express = require('express');
var router = express.Router();
const keycloak = require('../security/KeycloakProtect.js').getKeycloak();

router.post('/generate', keycloak.protect(), function(req, res) {
	var apiConf = new ApiConfiguration(req.body);
	console.log(apiConf);
	apiConf.validate()
	if (apiConf.hasErrors()) {
		res.status(400).send(apiConf.errors);
	} else {
		var generator = new GeneratorService();
		generator.generate("lorenzito", apiConf);
		res.sendStatus(200);
	}
});

module.exports = router;