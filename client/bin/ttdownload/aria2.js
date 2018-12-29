const shell = require('shelljs');
const path = require('path');
// const Config = require('./config');
var clientAria2 = require('aria2');

function ucfirst(str) {
    var str = str.toLowerCase();
    var strarr = str.split(' ');
    var result = '';
    for (var i in strarr) {
        result += strarr[i].substring(0, 1).toUpperCase() + strarr[i].substring(1);
    }
    return result;
}

function sleep(msec) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(msec);
        }, msec);
    });
}
class Aria2 {
    constructor(config) {
        this.config = config;
        this.curstatus = 0;
        this.path = './bin/' + process.platform + '/';
        this.path = path.join(__dirname, this.path);
        this.aria2c = process.platform == 'win32' ? '.\\aria2c.exe' : './aria2c';
        this.aria2List = {};
        this.callbackPool = {};
        this.refreshClock = 1000;
        shell.cd(this.path);
    }


    /*** 服务端***/
    async start() {
        var self = this;
        let called = false;
        var status = await this.status();
        if (status) {
            return true;
        } else {
            var cmdstr = self.aria2c + ' --conf-path=' + path.join(__dirname, './config/aria2.conf');
            if (!!self.config.dir) {
                cmdstr += ' --dir=' + self.config.dir
            }
            return new Promise(function (resolve, reject) {
                self.runSh(cmdstr, function (data) {
                    if (data.indexOf('IPv4 RPC: listening on TCP port 6800')) {
                        resolve(true);
                    } else {
                        setTimeout(function () {
                            resolve(false);
                        }, 5000)
                    }
                }).then((res) => {
                    if (!res) {
                        resolve(false);
                    }
                });
            });
        }
    }
    async stop(callback) {
        if (!callback) {
            callback = null;
        }
        try {
            var res = await this.runSh('stop', callback);
            return res;
        } catch (error) {
            return false;
        }
    }

    on(event, callback) {
        if (typeof (callback) != 'function') {
            return;
        }
        if (!this.callbackPool[event]) {
            this.callbackPool[event] = [];
        }
        this.callbackPool[event].push(callback);
    }

    runSh(sh, onData) {
        if (sh.indexOf(' ') == -1 && sh.indexOf('.') == -1) {
            if (process.platform == 'win32') {
                sh = '.\\' + sh + '.bat';
            } else {
                sh = './' + sh + '.sh';
            }
        }
        return new Promise(function (resolve, reject) {


            var child = shell.exec(sh, {
                async: true,
                silent: true,
            }, function (code, stdout, stderr) {
                if (!!stderr) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            });

            if (typeof (onData) == 'function') {
                var data_line = '';
                child.stdout.on('data', function (data) {
                    data_line += data;
                    if (data_line.indexOf('{') == 0) {
                        data_line = JSON.parse(data_line);
                    }
                    onData(data_line);
                });
            }
        });
    }
    status() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.runSh('status', function (res) {
                if (!!res && res.toLowerCase().indexOf('pid') > -1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).then(function (res) {
                if (!res) {
                    resolve(false);
                }
            });
        });
    }

    /**** client端** */
    async init() {
        var self = this;
        var starres = await this.start();
        if (!starres) {
            return starres;
        }
        var result;
        try {
            result = await new Promise(function (resolve, reject) {
                var aria2 = new clientAria2({
                    host: "localhost",
                    port: 6800,
                    secure: false,
                    secret: "focusbetv",
                    path: "/jsonrpc"
                });
                self.aria2 = aria2;
                aria2.onopen = function (a, b) {
                    resolve(!a);
                    if (!a) {
                        self.bind();
                    }
                };
                aria2.open();


            })
        } catch (error) {
            result = false;
        }
        return result;
    }
    bind() {
        var self = this;
        this.aria2.onDownloadStart = function (gid) {
            if (!!self.callbackPool['start']) {
                for (var i in self.callbackPool['start']) {
                    self.callbackPool['start'][i](gid);
                }
            }
        };
        this.aria2.onDownloadError = function (gid) {
            if (!!self.callbackPool['error']) {
                for (var i in self.callbackPool['error']) {
                    self.callbackPool['error'][i](gid);
                }
            }
        };
        this.aria2.onDownloadPause = function (gid) {
            if (!!self.callbackPool['pause']) {
                for (var i in self.callbackPool['pause']) {
                    self.callbackPool['pause'][i](gid);
                }
            }
        };
        this.aria2.onDownloadStop = function (gid) {
            if (!!self.callbackPool['stop']) {
                for (var i in self.callbackPool['stop']) {
                    self.callbackPool['stop'][i](gid);
                }
            }
        };
        this.aria2.onDownloadComplete = function (gid) {
            if (!!self.callbackPool['complete']) {
                for (var i in self.callbackPool['complete']) {
                    self.callbackPool['complete'][i](gid);
                }
            }
        };

        // setInterval(function () {
        //     var result;
        //     self.getDownArray("active", result).then(function () {

        //     });
        // }, this.refreshClock);

        this.bindProgress();
    }

    async bindProgress() {
        var self = this;
        try {
            var res = await this.getDownArray('active');
            if (res && typeof (res) == 'object') {
                for (var i in res) {
                    if (!!self.callbackPool['progress']) {
                        for (var j in self.callbackPool['progress']) {
                            self.callbackPool['progress'][j](res[i]);
                        }
                    }
                }
            }
            await sleep(1000);
            await this.bindProgress();
        } catch (error) {
            console.log(error);
        }

    }

    remove(gid) {
        return this.aria2.remove(gid);
    }
    getPercent(item) {
        try {
            return (
                parseInt(item.completedLength / item.totalLength * 1000) /
                10 +
                "%"
            );
        } catch (error) {
            return "--";
        }
    }
    getSpeed(item) {
        return parseInt(item.downloadSpeed / 1024 * 10) / 10 + "KB";
    }
    pause(gid) {
        if (!!gid) {
            return this.aria2.pause(gid);
        }
        return false;
    }
    resume(gid) {
        if (!!gid) {
            return this.aria2.unpause(gid);
        }
        return false;
    }
    resumeAll() {
        return this.aria2.unpauseAll();
    }
    pauseAll() {
        return this.aria2.pauseAll();
    }
    async addTask(url) {
        if (!url) {
            return false;
        }
        try {
            var result = await this.aria2.addUri([url]);
            return result;
        } catch (error) {
            return false;
        }
    }

    getDownArray(type, page, result) {
        if (!page) {
            page = 1;
        }
        if (!type) {
            return false;
        }
        if (typeof (page) == 'object') {
            result = page;
            page = 1;
        }
        if (!result) {
            result = this.aria2List;
        }
        var self = this;
        var method = "";
        
        var promise = new Promise(function (resolve, reject) {
            // resolve(type+' result');
            // return;
            if (typeof self.aria2["tell" + ucfirst(type)] == "function") {
                if (type == "active") {
                    self.aria2["tell" + ucfirst(type)](function (
                        error,
                        result
                    ) {
                        if (!error) {
                            self.aria2List[type] = result;
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                } else {
                    self.aria2["tell" + ucfirst(type)](
                        (page - 1) * 10,
                        page * 10 - 1,
                        function (error, result) {
                            if (!error) {
                                self.aria2List[type] = result;
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );
                }
            } else {
                resolve("没有方法" + "tell" + ucfirst(type));
            }
        });
        return promise;
    }
    getDownStatus(gid) {
        var task;
        if (typeof gid == "object") {
            task = gid;
            gid = task.gid;
        }
        var self = this;
        return new Promise(function (resolve, reject) {
            self.aria2.tellStatus(gid, function (error, res) {
                if (!error) {
                    if (!!task) {
                        task["completedLength"] = res["completedLength"];
                    }
                    resolve(res);
                } else {
                    resolve(fase, error);
                }
            });
        });
    }
}
module.exports = Aria2;