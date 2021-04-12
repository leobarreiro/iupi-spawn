let ApiConfiguration = require("../requests/ApiConfiguration");
var express = require('express');
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();

router.post('/validate', keycloak.protect('admin'), function(req, res) {
	var apiConf = new ApiConfiguration(req.body);
	console.log(apiConf);
	apiConf.validate()
	if (apiConf.hasErrors()) {
		res.status(400).send(apiConf.errors);
	} else {
		res.sendStatus(200);
	}
});

module.exports = router;