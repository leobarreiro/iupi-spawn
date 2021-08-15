let pathConf = require("../config/path.json");
let path = require("path");

class DownloadHelper {
    
    constructor(oauthuser, fileName) {
        
        this.path = pathConf.apiDownloadsDir + "/" + oauthuser + "/";
        this.fileName = fileName;
        this.completePath = path.resolve(__dirname, "..", "..", pathConf.apiDownloadsDir, oauthuser, fileName);
        this.message = "";
        this.error = false;
    }

}

module.exports = DownloadHelper;