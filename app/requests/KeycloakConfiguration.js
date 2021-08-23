const GenericValidator = require("../helpers/GenericValidator");

class KeycloakConfiguration {

    constructor(json) {
        this.genericValidator = new GenericValidator;
        if (json) {
            this.useKeycloak = true;
            this.realm = json.realm;
            this.url = json.url;
            this.clientid = json.clientid;
            this.clientsecret = json.clientsecret;
        } else {
            this.useKeycloak = false;
        }
    }

    validate() {
        if (this.useKeycloak === false || (this.realm != null && this.url != null && this.clientid != null && this.clientsecret != null)) {
            return null;
        } else {
            return { field: "keycloak", valid: false, message: "Please review your keycloak configuration" };
        }
    }

}

module.exports = KeycloakConfiguration;