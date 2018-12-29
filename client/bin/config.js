const jsonfile = require("jsonfile");
const path = require('path');
const Config = {
    config:null,
    file:path.resolve(__dirname, "../config/config.json"),
    getConfig: function (index, callback) {
        var self = this;
        if (typeof index == "function") {
            callback = index;
            index = null;
        }
        if (!this.config) {

            var result;
            jsonfile.readFile(this.file, function (err, obj) {
                
                if (!!obj && obj[process.platform]) {
                    Object.assign(obj, obj[process.platform]);
                    delete obj[process.platform];
                }
                self.config = obj || null;
                console.log(1111);
                console.log(err);
                console.log(self.config);
                returnresul();
            });
        } else {
            returnresul();
        }
        let returnresul = function () {
            let result = null;
            if (!!self.config) {
                if (!!index && self.config[index]) {
                    result = self.config[index];
                }
                result = self.config;
            }
            if (typeof callback == "function") {
                callback(result);
            }
        };
    },
    setConfig: function (key, value, callback) {
        if (typeof key == "function") {
            callback = key;
            key = null;
            value = null;
        }
        if (typeof value == "undefined") {
            value = "";
        }
        if (!this.config) {
            if (typeof callback == "function") {
                callback(false);
            }
            return;
        }
        if (!!key) {
            this.config[key] = value;
        }
        
        jsonfile.writeFile(this.file, this.config, {
            spaces: 2,
            EOL: "\r\n"
        }, function (
            err
        ) {
            if (typeof callback == "function") {
                callback(!err);
            }
        });
    }
}
module.exports = Config;