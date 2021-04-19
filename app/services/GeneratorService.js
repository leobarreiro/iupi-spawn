//const del = require('del');
var fs = require("fs");
var memFs = require("mem-fs");
var fsEditor = require("mem-fs-editor");
const AdmZip = require("adm-zip");
var PathsHelper = require("../helpers/PathsHelper");

class GeneratorService {

    constructor() {
    }
    
    generate(oauthuser, config) {

        config.paths = new PathsHelper(oauthuser, config);
        console.log(config);

        new Promise(resolve => {
            var editor = fsEditor.create(memFs.create());
            editor.copyTpl(config.paths.templates.root + "/pom.xml", config.paths.dirs.root + "/pom.xml", config);
            
            editor.copyTpl(config.paths.templates.resourceMain + "/application.yml", config.paths.dirs.resourceMain + "/application.yml", config);
            editor.copyTpl(config.paths.templates.resourceMain + "/application-dev.yml", config.paths.dirs.resourceMain + "/application-dev.yml", config);
            editor.copyTpl(config.paths.templates.resourceMain + "/bootstrap.yml", config.paths.dirs.resourceMain + "/bootstrap.yml", config);

            editor.copyTpl(config.paths.templates.appMain + "/ApiApplication.java", config.paths.dirs.appMain + "/ApiApplication.java", config);

            if (config.cache && config.cache == "redis") {
                editor.copyTpl(config.paths.templates.config + "/CacheConfig.java", config.paths.dirs.config + "/CacheConfig.java", config);
                editor.copyTpl(config.paths.templates.config + "/CacheKeyGenerator.java", config.paths.dirs.config + "/CacheKeyGenerator.java", config);
            }

            if (config.jpa) {
                editor.copyTpl(config.paths.templates.config + "/JpaConfig.java", config.paths.dirs.config + "/JpaConfig.java", config);
                editor.copyTpl(config.paths.templates.model + "/Registry.java", config.paths.dirs.model + "/Registry.java", config);
                editor.copyTpl(config.paths.templates.repository + "/RegistryRepository.java", config.paths.dirs.repository + "/RegistryRepository.java", config);
                editor.copyTpl(config.paths.templates.service + "/RegistryService.java", config.paths.dirs.service + "/RegistryService.java", config);
            }

            if (config.nosql == 'mongo') {
                editor.copyTpl(config.paths.templates.model + "/Person.java", config.paths.dirs.model + "/Person.java", config);
                editor.copyTpl(config.paths.templates.repository + "/PersonRepository.java", config.paths.dirs.repository + "/PersonRepository.java", config);
                editor.copyTpl(config.paths.templates.service + "/PersonService.java", config.paths.dirs.service + "/PersonService.java", config);
            }

            if (config.amqp) {
                if (config.amqp == 'kafka') {
                    editor.copyTpl(config.paths.templates.amqp + "/KafkaChannels.java", config.paths.dirs.amqp + "/KafkaChannels.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/KafkaMessageListener.java", config.paths.dirs.amqp + "/KafkaMessageListener.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/KafkaMessageSender.java", config.paths.dirs.amqp + "/KafkaMessageSender.java", config);
                } else if (config.amqp == 'rabbit') {
                    editor.copyTpl(config.paths.templates.amqp + "/RabbitChannels.java", config.paths.dirs.amqp + "/RabbitChannels.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/RabbitMessageListener.java", config.paths.dirs.amqp + "/RabbitMessageListener.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/RabbitMessageSender.java", config.paths.dirs.amqp + "/RabbitMessageSender.java", config);
                } else if (config.amqp == 'mqtt') {
                    editor.copyTpl(config.paths.templates.amqp + "/MqttConfig.java", config.paths.dirs.amqp + "/MqttConfig.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/MqttMessageListener.java", config.paths.dirs.amqp + "/MqttMessageListener.java", config);
                    editor.copyTpl(config.paths.templates.amqp + "/MqttMessageSender.java", config.paths.dirs.amqp + "/MqttMessageSender.java", config);
                }
            }

            editor.copyTpl(config.paths.templates.service + "/ApiBaseService.java", config.paths.dirs.service + "/ApiBaseService.java", config);
            editor.copyTpl(config.paths.templates.controller + "/ApiBaseController.java", config.paths.dirs.controller + "/ApiBaseController.java", config);

            if (config.k8s.generatek8s) {
                editor.copyTpl(config.paths.templates.docker + "/Dockerfile", config.paths.dirs.docker + "/Dockerfile", config);
                editor.copyTpl(config.paths.templates.k8s + "/01-deploy.yml", config.paths.dirs.k8s + "/01-deploy.yml", config);
                editor.copyTpl(config.paths.templates.k8s + "/02-service.yml", config.paths.dirs.k8s + "/02-service.yml", config);
                editor.copyTpl(config.paths.templates.k8s + "/03-ingress.yml", config.paths.dirs.k8s + "/03-ingress.yml", config);
            }

            editor.commit(resolve);

        }).then((result) => {

            const zipFile = new AdmZip();
            zipFile.addLocalFolder(config.paths.dirs.root);
            zipFile.writeZip(config.paths.download.path + "/" + config.paths.download.fileName);
            try {
                fs.rmdirSync(config.paths.dirs.root, { recursive: true });
            } catch (err) {
                console.error(`Error while deleting ${config.paths.dirs.root}.`);
            }

        });

        /*return {
            appType: "SpringBoot Rest API",
            appName: config.artifactId,
            appVersion: config.version,
            appZipFile: config.paths.downloadFile,
       };*/

       return config.paths.download;

    }

}

module.exports = GeneratorService;