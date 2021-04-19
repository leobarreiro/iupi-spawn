var GenericValidator = require("../helpers/GenericValidator");

class K8sConfiguration {

    constructor(json) {
        if (json) {
            this.genericValidator = new GenericValidator();
            this.generatek8s 		= true,
            this.dockerRegistry 	= json.dockerRegistry,
            this.dockerNamespace 	= json.dockerNamespace,
            this.ingressHost 		= json.ingressHost
        } else {
            this.generatek8s = false;
        }
    }

    validate() {
        if (this.generatek8s === false || 
            (this.dockerRegistry != null && this.dockerNamespace != null && this.ingressHost != null)
        ) {
            return null;
        } else {
            return { field: "k8s", valid: false, message: "Please review your k8s configuration" };
        }
    }

}

module.exports = K8sConfiguration;