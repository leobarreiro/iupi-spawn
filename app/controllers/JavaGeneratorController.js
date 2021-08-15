let ApiConfiguration = require("../requests/ApiConfiguration");
let JavaGeneratorService = require("../services/JavaGeneratorService");
const path = require("path");
var express = require('express');
const { nextTick } = require("process");
var router = express.Router();
const keycloak = require('../security/KeycloakProtect.js').getKeycloak();

//router.post('/generate', keycloak.protect(), function(req, res) {
router.post('/generate', function(req, res) {
	var apiConf = new ApiConfiguration(req.body);
	apiConf.validate();
	if (apiConf.hasErrors()) {
		res.status(400).send(apiConf.errors);
	} else {
		var customerID = req.header("customerID") != null ? req.header("customerID") : "arphoenix";
		var generator = new JavaGeneratorService();
		var appGenerator = generator.generate(customerID, apiConf);
		//res.status(200).sendFile(appDownload.fileName, options);
		res.status(200).type("application/json").end(JSON.stringify(appGenerator));
	}
});

router.get("/download/:artifactId", function(req, res) {
	console.log("Downloading artifact " + req.params.artifactId + "...");
	var customerID = req.header("customerID") != null ? req.header("customerID") : "arphoenix";
	var fileName = req.params.artifactId;
	var generator = new JavaGeneratorService();
	var apiDownload = generator.download(customerID, fileName);

	if (apiDownload.error) {
		var errResponse = {
			error: true,
			message: apiDownload.message
		}
		res.status(400).type("application/json").send(JSON.stringify(errResponse));
	} else {
		var options = {
			root: path.join(apiDownload.path)
		}
		res.status(200).type("application/zip").sendFile(apiDownload.fileName, options);
	}

});

module.exports = router;