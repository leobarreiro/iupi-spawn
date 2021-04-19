let ApiValidator = require("../helpers/ApiValidator");
let KeycloakConfiguration = require("./KeycloakConfiguration");
let K8sConfiguration = require("./K8sConfiguration");

class ApiConfiguration {

    constructor(json) {
        this.paths              = {};
        this.groupId            = json.groupId;
        this.artifactId         = json.artifactId;
        this.version            = json.version;
        this.container          = json.container;
        this.port               = json.port;
        this.database           = json.database;
        this.databaseDialect    = (this.database == 'postgres') ? 'PostgreSQL9Dialect' : 'Oracle10gDialect'; 
        this.jpa                = (this.database != null);
        this.nosql              = json.nosql;
        this.amqp               = json.amqp;
        this.cloud              = (this.amqp != null);
        this.cache              = json.cache;
        this.openapi            = json.openapi;
        this.devtools           = json.devtools;
        this.actuator           = json.actuator;
        this.keycloak           = (json.keycloak != null) ? new KeycloakConfiguration(json.keycloak) : new KeycloakConfiguration(null);
        this.k8s                = (json.k8s != null) ? new K8sConfiguration(json.k8s) : new K8sConfiguration(null);
        this._validator         = new ApiValidator();
        this.errors             = []
    }

    validate() {
        this._validator.isValidArtifactId(this.artifactId, this.errors);
        this._validator.isValidGroupId(this.groupId, this.errors);
        this._validator.isValidVersion(this.version, this.errors);
        this._validator.isValidContainer(this.container, this.errors);
        this._validator.isValidPort(this.port, this.errors);
        this._validator.isValidDatabase(this.database, this.errors);
        this._validator.isValidNosql(this.nosql, this.errors);
        this._validator.isValidAmqp(this.amqp, this.errors);
        this._validator.isValidOpenapi(this.openapi, this.errors);
        this._validator.isValidDevtools(this.devtools, this.errors);
        this._validator.isValidActuator(this.actuator, this.errors);

        var validKeycloak = this.keycloak.validate();
        if (validKeycloak) {
            this.errors.push(validKeycloak);
        }
        var validK8s = this.k8s.validate();
        if (validKeycloak) {
            this.errors.push(validK8s);
        }

        return !this.hasErrors();
    }

    hasErrors() {
        return this.errors.length > 0;
    }

}

module.exports = ApiConfiguration;