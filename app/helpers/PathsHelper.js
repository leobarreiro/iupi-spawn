let pathConf = require("../config/path.json");

class PathsHelper {
    
    constructor(oauthuser, config) {
        
        var absoluteMsPath = pathConf.msGenerateBaseDir + "/" + oauthuser + "/" + config.artifactId;
        var absoluteTemplatePath = pathConf.templateBasePath;
        
        this.download = {
            path: pathConf.downloads + "/" + oauthuser + "/",
            fileName: config.artifactId + ".zip"
        };
        //this.downloadFile = pathConf.downloads + "/" + oauthuser + "/" + config.artifactId + ".zip";
        
        this.templates = {
            root:           absoluteTemplatePath,
            docker:         absoluteTemplatePath + "/src/docker",
            k8s:            absoluteTemplatePath + "/src/k8s",
            javaMain:       absoluteTemplatePath + "/src/main/java",
            resourceMain:   absoluteTemplatePath + "/src/main/resources",
            testMain:       absoluteTemplatePath + "/src/tests",
            appMain:        absoluteTemplatePath + "/src/main/java/io/iupi/api", 
            config:         absoluteTemplatePath + "/src/main/java/io/iupi/api/config",
            model:          absoluteTemplatePath + "/src/main/java/io/iupi/api/model",
            repository:     absoluteTemplatePath + "/src/main/java/io/iupi/api/repository",
            amqp:           absoluteTemplatePath + "/src/main/java/io/iupi/api/amqp",
            service:        absoluteTemplatePath + "/src/main/java/io/iupi/api/service",
            controller:     absoluteTemplatePath + "/src/main/java/io/iupi/api/controller"
        };

        this.dirs = {
            root:           absoluteMsPath,
            docker:         absoluteMsPath + "/src/docker",
            k8s:            absoluteMsPath + "/src/k8s",
            javaMain:       absoluteMsPath + "/src/main/java",
            resourceMain:   absoluteMsPath + "/src/main/resources",
            testMain:       absoluteMsPath + "/src/tests",
            appMain:        absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config), 
            config:         absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/config",
            model:          absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/model",
            repository:     absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/repository",
            amqp:           absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/amqp",
            service:        absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/service",
            controller:     absoluteMsPath + "/src/main/java/" + this._dirMainPackage(config) + "/controller"
        };

        this.packages = {
            appMain:        this._packageMain(config),
            config:         this._packageMain(config) + ".config",
            model:          this._packageMain(config) + ".model",
            repository:     this._packageMain(config) + ".repository",
            amqp:           this._packageMain(config) + ".amqp",
            service:        this._packageMain(config) + ".service",
            controller:     this._packageMain(config) + ".controller"
        };

    }

    _dirMainPackage(config) {
        return config.groupId.split(".").join("/") + "/" + config.artifactId;
    }

    _packageMain(config) {
        return config.groupId + "." + config.artifactId;
    }

}

module.exports = PathsHelper;