var memFs = require("mem-fs");
var fsEditor = require("mem-fs-editor");
const AdmZip = require("adm-zip");
var PathsHelper = require("../helpers/PathsHelper");

class GeneratorService {

    constructor() {
    }
    
    generate(oauthuser, config) {

        var paths = new PathsHelper(oauthuser, config);
        console.log(paths);

        /*
        new Promise(resolve => {
            var editor = fsEditor.create(memFs.create());
            editor.copyTpl(paths.templates.root + "/pom.xml", paths.dirs.root + "/pom.xml", config);
            editor.commit(resolve);
        }).then((result) => {
            // ZIP File
            const zipFile = new AdmZip();
            zipFile.addLocalFolder(paths.dirs.root);
            zipFile.writeZip(paths.dirs.root + "/" + config.artifactId + ".zip");
        });
        */
    }

}

module.exports = GeneratorService;