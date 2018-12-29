var request = require("request");
var http = require("http");
var https = require("https");
var querystring = require("querystring");
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.replaceAll = function(replaceStr,newstr)  
{  
    //return this.replace(/(^\s*)|(\s*$)/g, "");  
    return this.replace(new RegExp(replaceStr,'gm'),newstr);
} 
Date.prototype.format = function (fmt) {
    //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
var Utli = {
    HTMLDecode(s) {
        this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

        this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

        this.REGX_TRIM = /(^\s*)|(\s*$)/g;

        this.HTML_DECODE = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&nbsp;": " ",
            "&quot;": '"',
            "&copy;": ""

            // Add more
        };
        var self = this;
        var HTML_DECODE = this.HTML_DECODE;

        s = s != undefined ? s : this.toString();
        return typeof s != "string"
            ? s
            : s.replace(this.REGX_HTML_DECODE, function ($0, $1) {
                var c = HTML_DECODE[$0];
                if (c == undefined) {
                    // Maybe is Entity Number
                    if (!isNaN($1)) {
                        c = String.fromCharCode($1 == 160 ? 32 : $1);
                    } else {
                        c = $0;
                    }
                }
                return c;
            });
    },
    async asynceach(obj, callback) {
        var promiselist = [];
        obj.each(function (index, item) {
            promiselist.push(callback(index, item));
        });
        result = await Promise.all(promiselist);
        return result;
    },
    getClearUrl(url) {
        if (url.indexOf("?") > -1) {
            var urarr = url.split("?");
            return urarr[0];
        }
        return url;
    },
    getDate(datestr, split) {
        var dataarr = datestr.split(split);
        if (dataarr.legth < 3) {
            return null;
        }
        for (var i in dataarr) {
            dataarr[i] = parseInt(dataarr[i]);
        }

        var date = new Date(dataarr[0], dataarr[1] - 1, dataarr[2]).format(
            "yyyy-MM-dd"
        );
        return date;
    },
    getcurYear: function () {
        return new Date().getFullYear();
    },
    getCurTime: function () {
        return new Date();
    },
    sleep(time) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    },
    _request(options, type, data) {
        if (typeof (options) == 'string') {
            options = {

                path: options
            }
        }
        type = type.toUpperCase();
        if (!type) {
            type = "POST";
        }
        var post_data = querystring.stringify(data);
        if (type == "GET" && !!post_data) {
            options.path += "?" + post_data;
        }

        var defaultoptions = {
            host: "so.360kan.com",
            path: '',
            method: type,
            Referer: "https://www.baidu.com",
            protocol: "https:",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": type == "GET" ? 0 : post_data.length
            }
        };
        options = Object.assign(defaultoptions, options);
        var server = options.protocol == "https:" ? https : http;
        return new Promise(function (resolve, reject) {
            try {
                //console.log(options);
                var post_req = server.request(options, function (res) {
                    //console.log(res);
                    if (res.statusCode == 200) {
                        res.setEncoding("utf8");
                        var html = "";
                        res.on("data", function (buffer) {
                            html += buffer.toString();
                        });
                        res.on("end", function () {
                            resolve(html);
                            // console.log(JSON.parse(html).seriesHTML );
                        });
                    } else {
                        resolve(false);
                    }
                });
                if (type == "POST") {
                    post_req.write(post_data);
                } else {
                    post_req.end();
                }
            } catch (error) {
                console.log(error);
            }


        });
    }
};

module.exports = Utli;
