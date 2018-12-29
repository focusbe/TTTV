const electron = require("electron");
const NodeCast = require("nodecast-js");
const protocol = electron.protocol;
const autoUpdater = require("electron-updater").autoUpdater;
const BrowserView = electron.BrowserView;
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const powerSaveBlocker = electron.powerSaveBlocker;
const path = require("path");
const url = require("url");
var inarar = __dirname.indexOf("app.asar") > -1;
var shelljs = require('shelljs');
let DEBUG = !inarar;
var isproduct = inarar;
const TTdownload = require('./bin/ttdownload');
let defaultWindow = {
    width: 1200,
    height: 800,
    frame: false,
    acceptFirstMouse: true,
    webPreferences: {
        webSecurity: false,
        plugins: true,
        nativeWindowOpen: false,
        scrollBounce: true
    },
    show: false,
    titleBarStyle: "hidden",
    backgroundColor: "#2e2e36"
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

const Main = {
    callback: [],
    Windows: {},
    config: null,
    dlnaList: [],
    ttdownload:false,
    init: function () {
        var self = this;
        app.on("ready", function () {

            //self.Dlna('http://api.baiyug.cn/vip/?url=http://v.youku.com/v_show/id_XMTMzOTkzNjU0OA==.html');
            //self.setAppMenu();
            //return;
            self.createWindow("main", "main.html", {
                onShow: function () {
                    self.initUpdater();
                }
            });

        });
        app.on("window-all-closed", function () {
            //if (process.platform !== 'darwin') {
            app.quit();
            //}
        });
        app.on("activate", function () {
            self.createWindow("main");
        });
        this.initfenfa();
        this.addFlashPlugin();
        this.getdlnaList();
    },
    addFlashPlugin: function () {
        let pluginName, pluginsrc;
        switch (process.platform) {
            case "win32":
                pluginName = "pepflashplayer.dll";
                break;
            case "darwin":
                pluginName = "PepperFlashPlayer.plugin";
                break;
            case "linux":
                pluginName = "libpepflashplayer.so";
                break;
        }
        var rootDir = inarar ? "../app.asar.unpacked/" : "";
        pluginsrc = path.join(__dirname, rootDir + "plugins/" + pluginName);
        app.commandLine.appendSwitch("ppapi-flash-path", pluginsrc);
    },
    Dlna: function (data) {
        console.log(data);
        return;
        //console.log(cururl);
        let win = new BrowserWindow({
            width: 320,
            height: 600,
            show: true
        });
        win.on("closed", () => {
            win = null;
        });
        let view = new BrowserView({
            webPreferences: {
                webSecurity: false,
                plugins: true,
                nativeWindowOpen: false,
                scrollBounce: true
            }
        });
        win.setBrowserView(view);
        view.setBounds({
            x: 0,
            y: 0,
            width: 320,
            height: 600
        });
        //console.log("http://api.baiyug.cn/vip/index.php?url=" + url);
        view.webContents.loadURL("http://api.baiyug.cn/vip/index.php?url=" + data, {
            userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Mobile Safari/537.36"
        });
        //console.log(view.webContents);
        if (DEBUG) {
            view.webContents.openDevTools();
        }
        let cururl = url.format({
            pathname: path.join(__dirname, "src/embed/main.js"),
            protocol: "file",
            slashes: true
        });
        cururl = cururl.replace(/\\/g, "/");
        //console.log(cururl);
        view.webContents.on("dom-ready", event => {
            //console.log(event);
            view.webContents.executeJavaScript(
                "var body=document.getElementsByTagName('body')[0]; console.log(body);var scriptE = document.createElement('script');scriptE.src='" +
                cururl +
                "';body.appendChild(scriptE);",
                false,
                function (err) {
                    console.log(err);
                }
            );
        });

    },
    getdlnaList: function () {
        var self = this;
        if (!self.nodeCast) {
            self.nodeCast = new NodeCast();
            //console.log(nodeCast);
            self.nodeCast.onDevice(device => {

                self.dlnaList = self.nodeCast.getList();
                console.log(self.dlnaList);
                if (!!self.Windows['playVideo']) {
                    self.sendTo('playVideo', 'dlnalist', self.dlnaList);
                }
                //device.play('https://videogame.ztgame.com.cn/xx2/20171204/1204-151237691878.mp4');
            });
            self.nodeCast.start();
        }
        self.dlnaList = self.nodeCast.getList();
        return self.nodeCast.getList();
    },
    getUrl: function (src, config) {
        var search = config.search || "";
        var hash = config.hash || "";

        if (src.indexOf("//") < 0) {
            cururl = url.format({
                pathname: path.join(__dirname, (!isproduct ? "src/" : "dist/") + src),
                protocol: "file",
                slashes: true,
                search: search,
                hash: hash
            });
        } else {
            cururl = src;
        }
        return cururl;
    },
    createWindow: function (tag, src, config) {
        var self = this;
        if (!src) {
            return;
        }
        if (!config) {
            config = {};
        }

        config = Object.assign(defaultWindow, config);

        if (!self.Windows[tag]) {
            self.Windows[tag] = new BrowserWindow(config);

            self.Windows[tag].once("ready-to-show", function () {

                let hwnd = self.Windows[tag].getNativeWindowHandle(); //获取窗口句柄。
                self.Windows[tag].show();
                if (typeof config.onShow == "function") {
                    config.onShow();
                }
            });
            self.Windows[tag].webContents.on("dom-ready", function () {
                self.Windows[tag].webContents.executeJavaScript('window.WINDOWTAG="' + tag + '"');
            });
            self.Windows[tag].loadURL(this.getUrl(src, config));

            if (DEBUG) {
                this.Windows[tag].webContents.openDevTools();
            }
            self.Windows[tag].on("closed", function () {
                if (typeof config.onClose == "function") {
                    config.onClose();
                }
                self.Windows[tag] = null;
                delete self.Windows[tag];
            });
        } else {
            self.Windows[tag].loadURL(this.getUrl(src, config));
            self.Windows[tag].show();
        }

        // and load the index.html of the app.
    },
    sendTo: function (tag, event, data) {
        if (!this.Windows[tag]) {
            return;
        }
        if (!event) {
            return;
        }
        if (!data) {
            data = null;
        }
        this.Windows[tag].webContents.send("senddata", {
            event: event,
            data: data
        });
        //console.log(event);
    },
    sendAll: function (event, data) {
        for (var i in this.Windows) {
            this.Windows[i].webContents.send("senddata", {
                event: event,
                data: data
            });
        }
    },
    initUpdater: function () {
        if (DEBUG) {
            return;
        }
        var self = this;
        autoUpdater.on("checking-for-update", () => {
            //console.log('checking');
        });
        autoUpdater.on("update-available", (ev, info) => {
            // if (DEBUG) {
            //     console.log('有更新');
            // }
            // console.log('available');
        });
        autoUpdater.on("update-not-available", (ev, info) => {
            // console.log('not-available');
            //alert('无更新');
        });
        autoUpdater.on("error", (ev, err) => {
            //console.log('error:');
            //console.log(ev);
            // console.log(err);
        });
        autoUpdater.on("download-progress", (ev, progressObj) => {
            // console.log('download progress');
            // console.log(ev);
            // console.log(progressObj);
            // 			{total: 83452555,
            //   delta: 233280,
            //   transferred: 437227,
            //   percent: 0.5239228445432258,
            //   bytesPerSecond: 174751 }
            //self.sendTo('main','alert','Download progress...');
        });
        autoUpdater.on("update-downloaded", (ev, info) => {
            //console.log('update-downloaded');
            // setTimeout(function () {
            // 	autoUpdater.quitAndInstall();
            // }, 5000)
            self.sendTo("main", "update-downloaded");
        });
        autoUpdater.checkForUpdates();
    },
    
    
    getData: function (data) {
        console.log(data);
        if (!data || !data.name || !data.windowtag || !data.id) {
            return;
        }
        let result = null;
        try {
            result = eval('this.' + data.name);

        } finally {

        }
        console.log(result);
        this.sendTo(data.windowtag, 'callbackdata_' + data.id, result);
    },
    startAria2(callback) {
        
    },
    initfenfa: function (event, callback) {
        var self = this;
        ipcMain.on("senddata", function (socket, result) {
            //console.log(result)
            // return;
            if (!!result && !!result.tag && !!result.event) {
                let tag = result.tag;
                let event = result.event;
                if (!result.data) {
                    result.data = null;
                }
                let data = result.data;
                if (tag == "ALLWINDOWS") {
                    self.sendAll(event, data);
                } else if (tag == "backend") {
                    switch (event) {
                        case 'getdata':
                            self.getData(data);
                            break;
                        case "goturl":
                            console.log(data);
                            break;
                        case "playvideo":
                            var powerId;
                            Main.createWindow("playVideo", "main.html", {
                                search: "url=" + data,
                                hash: "#/video/play",
                                onShow: function () {
                                    powerId = powerSaveBlocker.start("prevent-display-sleep");
                                    // self.sendTo('playVideo','dlnalist',self.dlnaList);
                                    //console.log('onshow');
                                },
                                onClose: function () {
                                    //console.log('onclose');
                                    if (!!powerSaveBlocker && !!powerId) {
                                        powerSaveBlocker.stop(powerId);
                                    }

                                }
                            });
                            break;
                        case "openpage":
                            Main.createWindow(data.id, "main.html", {
                                hash: "#/" + data.hash,
                                search: data.search
                            });
                            break;
                        case "openurl":
                            shell.openExternal(data);
                            break;
                        case "quitandinstall":
                            autoUpdater.quitAndInstall();
                            console.log("quitandinstall");
                            break;
                        case "dlna":
                            self.Dlna(data);
                            break;
                        case "dlanurl":
                            console.log('dlnaurl')
                            console.log(data);
                            if (!data || !data.playlist || data.playlist.length == 0) {
                                self.sendTo('playVideo', 'dlnastatus', {
                                    status: -1
                                });
                                return;
                            }
                            var index = data.deviceid;
                            var device = self.dlnaList[index];
                            var url = data.playlist[data.playlist.length - 1]['url'];
                            if (url.indexOf('//') == 0) {
                                url = 'http:' + url;
                            }
                            console.log(self.dlnaList);
                            console.log(device);
                            console.log(url);
                            if (!!device && !!url) {
                                try {
                                    device.play(
                                        decodeURIComponent(url)
                                    );
                                    self.sendTo('playVideo', 'dlnastatus', {
                                        status: 1
                                    });
                                } catch (error) {
                                    self.sendTo('playVideo', 'dlnastatus', {
                                        status: -2
                                    });
                                }
                            } else {
                                self.sendTo('playVideo', 'dlnastatus', {
                                    status: -1
                                });
                            }

                            // self.DlnaUrl(data);
                            break;


                    }
                } else {
                    self.sendTo(tag, event, data);
                }
            } else {
                console.log("缺少参数");
            }
        });
    }
};
Main.init();