const GenericValidator = require("../helpers/GenericValidator");

class KeycloakConfiguration {

    constructor(jsonObj) {
        this.genericValidator = new GenericValidator;
        this.errors = [];
        if (jsonObj) {
            this.useKeycloak = true;
            this.realm = jsonObj.realm;
            this.url = jsonObj.url;
            this.clientid = jsonObj.clientid;
            this.clientsecret = jsonObj.clientsecret;
        } else {
            this.useKeycloak = false;
        }
    }

    validate() {
        if (this.useKeycloak === false || (this.realm != null && this.url != null && this.clientid != null && this.clientsecret != null)) {
            console.log("keycloak is valid");
            return null;
        } else {
            console.log("keycloak is not valid");
            return { field: "keycloak", valid: false, message: "Please review your keycloak configuration" };
        }
    }

}

module.exports = KeycloakConfiguration;