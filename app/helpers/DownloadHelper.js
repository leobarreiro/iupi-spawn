let pathConf = require("../config/path.json");

class DownloadHelper {
    
    constructor(oauthuser, fileName) {
        
        this.path = pathConf.downloads + "/" + oauthuser + "/";
        this.fileName = fileName;
        this.completePath = pathConf.downloads + "/" + oauthuser + "/" + fileName;
        this.message = "";
        this.error = false;
    }

}

module.exports = DownloadHelper;