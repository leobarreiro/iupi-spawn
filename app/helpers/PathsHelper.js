let pathConf = require("../config/path.json");

class PathsHelper {

    constructor(oauthuser, config) {

        this._oauthuser = oauthuser;
        this._config = config;

        this.templates = {
            root: "/opt/templates", 
            javaMain: "src/main/java",
            resourceMain: "src/main/resources",
            testMain: "src/tests"
        };

        this.dirs = {
            root: "/opt/generated/" + oauthuser + "/" + config.artifactId,
            javaMain: "src/main/java",
            resourceMain: "src/main/resources",
            appMain: this._dirMain(),
            testMain: this._dirMain() + "/src/tests",
            model: "model",
            repository: "repository",
            service: "service",
            controller: "controller"
        };

        this.packages = {
            appMain: this._packageMain(),
            model: this._packageMain() + ".model",
            repository: this._packageMain() + ".repository",
            service: this._packageMain() + ".service",
            controller: this._packageMain() + ".controller"
        };

    }

    _dirMain() {
        return this._config.groupId.split(".").join("/") + "/" + this._config.artifactId;
    }

    _packageMain() {
        return this._config.groupId + "." + this._config.artifactId;
    }

}

module.exports = PathsHelper;