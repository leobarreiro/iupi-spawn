let ApiConfiguration = require("../requests/ApiConfiguration");
let GeneratorService = require("../services/GeneratorService");
const path = require("path");
var express = require('express');
const { nextTick } = require("process");
var router = express.Router();
const keycloak = require('../security/KeycloakProtect.js').getKeycloak();

router.post('/generate', keycloak.protect(), function(req, res) {
	var apiConf = new ApiConfiguration(req.body);
	apiConf.validate()
	if (apiConf.hasErrors()) {
		res.status(400).send(apiConf.errors);
	} else {
		var generator = new GeneratorService();
		var appDownload = generator.generate("lorenzito", apiConf);
		var options = {
			root: path.join(appDownload.path),
			headers: {
				'Content-type': 'application/zip',
				'x-timestamp': Date.now()
			}
		}
		res.status(200).sendFile(appDownload.fileName, options);
	}
});

module.exports = router;