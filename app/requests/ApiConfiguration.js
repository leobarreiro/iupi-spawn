let ApiValidator = require("../helpers/ApiValidator");
let KeycloakConfiguration = require("./KeycloakConfiguration");

class ApiConfiguration {

    constructor(jsonObject) {
        this.groupId = jsonObject.groupId;
        this.artifactId = jsonObject.artifactId;
        this.version = jsonObject.version;
        this.container = jsonObject.container;
        this.port = jsonObject.port;
        this.database = jsonObject.database;
        this.jpa = (this.database != null);
        this.nosql = jsonObject.nosql;
        this.amqp = jsonObject.amqp;
        this.cloud = (this.amqp != null);
        this.cache = jsonObject.cache;
        this.openapi = jsonObject.openapi;
        this.devtools = jsonObject.devtools;
        this.actuator = jsonObject.actuator;
        this.keycloak = (jsonObject.keycloak != null) ? new KeycloakConfiguration(jsonObject.keycloak) : new KeycloakConfiguration(null);
        this.validator = new ApiValidator();
        this.errors = []
    }

    validate() {
        this.validator.isValidArtifactId(this.artifactId, this.errors);
        this.validator.isValidGroupId(this.groupId, this.errors);
        this.validator.isValidVersion(this.version, this.errors);
        this.validator.isValidContainer(this.container, this.errors);
        this.validator.isValidPort(this.port, this.errors);
        this.validator.isValidDatabase(this.database, this.errors);
        this.validator.isValidNosql(this.nosql, this.errors);
        this.validator.isValidAmqp(this.amqp, this.errors);
        this.validator.isValidOpenapi(this.openapi, this.errors);
        this.validator.isValidDevtools(this.devtools, this.errors);
        this.validator.isValidActuator(this.actuator, this.errors);
        var validKeycloak = this.keycloak.validate();
        if (validKeycloak) {
            this.errors.push(validKeycloak);
        }

        return !this.hasErrors();
    }

    hasErrors() {
        return this.errors.length > 0;
    }

}

module.exports = ApiConfiguration;