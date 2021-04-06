let QuasarValidator = require("../helpers/QuasarValidator");
let KeycloakConf = require("./KeycloakConf");

class ApiConf {

    constructor(jsonObject) {
        this.groupId = jsonObject.groupId;
        this.artifactId = jsonObject.artifactId;
        this.version = jsonObject.version;
        this.container = jsonObject.container;
        this.port = jsonObject.port;
        this.amqp = "none";
        this.database = "none";
        this.noSql = "none";
        this.keycloak = (jsonObject.keycloak != null) ? new KeycloakConf(jsonObject.keycloak) : new KeycloakConf();
        this.validator = new QuasarValidator();
    }

    isValid() {
        this.validator.isValidArtifactId(this.artifactId);
        this.validator.isValidGroupId(this.groupId);
        this.validator.isValidVersion(this.version);
        this.validator.isValidContainer(this.container);
        this.validator.isValidPort(this.port);
        return !this.validator.hasErrors();
    }

}

module.exports = ApiConf;