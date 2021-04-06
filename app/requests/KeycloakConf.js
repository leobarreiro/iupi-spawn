
class KeycloakConf {

    constructor() {
        this.realm = "";
        this.url = "";
        this.clientId = "";
        this.clientSecret = "";
    }

    KeycloakConf(jsonObj) {
        this.realm = jsonObj.realm;
        this.url = jsonObj.url;
        this.clientId = jsonObj.clientId;
        this.clientSecret = jsonObj.clientSecret;
    }

    isValid() {
        if (this.realm != null && this.url != null && this.clientId != null && this.clientSecret != null) {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = KeycloakConf;