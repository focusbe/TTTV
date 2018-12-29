var rundao_my = {
    objs: new Object(),
    init: function() {
        this.objs.config = {
            ver: "2.6",
            url: "//vip.baiyug.cn/baiyug.php",
            payid: "dp",
            playerurl: "//vip.baiyug.cn/player/",
            sort: "desc",
            isyes: 0,
            furt: "http://api.baiyug.cn",
            ftime: "0",
            ckpar:
                "//vip.baiyug.cn/baiyug.php?file=726c765a6e386c5762566a4e7074576762354e6f6a574773336474686e61624f327370656d7148526b6d57706d4a5276313661696d5a746a6c71646a6e3632656e6e5463797142786d3853546c5757575a5a706d6d6c566c685a335a72614f62683279447071717070564e655639445870364f6779732b44616d706a6d474a596f3572636e386c5762566a496e594f74.file",
            cmppar:
                "//vip.baiyug.cn/baiyug.php?file=726c765a6e386c5762566a4e7074576762354e6f6a574773336474686e61624f327370656d7148526b6d57706d4a5276313661696d5a746a6c71646a6e3632656e6e5463797142786d3853546c5757575a5a706d6d6c566c685a335a72614f62683279447071717070564e655639445870364f6779732b44616d706a6d474a596f3572636e386c5762566a496e39465373673d3d.file",
            urlm:
                "//vip.baiyug.cn/baiyug.php?file=726c765a6e386c5762566a4e7074576762354e6f6a574773336474686e61624f327370656d7148526b6d57706d4a5276313661696d5a746a6c71646a6e3632656e6e5463797142786d3853546c5757575a5a706d6d6c566c685a335a72614f62683279447071717070564e655639445870364f6779732b44616d706a6d474a596f3572636e386c5762566a536f634f5a6f5a786272673d3d.file",
            dppar:
                "//vip.baiyug.cn/baiyug.php?file=726c765a6e386c5762566a4e7074576762354e6f6a574773336474686e61624f327370656d7148526b6d57706d4a5276313661696d5a746a6c71646a6e3632656e6e5463797142786d3853546c5757575a5a706d6d6c566c685a335a72614f62683279447071717070564e655639445870364f6779732b44616d706a6d474a596f3572636e386c5762566a4a6f6f4f74.file",
            ftd: "10800",
            pauto: "1",
            m3u8: "",
            mp4: ""
        };
        if (this.objs.config.isyes == 1 && this.objs.config.furt != "") {
            if (this.objs.config.ftime > 0) {
                setTimeout(function() {
                    location.replace(rundao.objs.config.furt);
                    window.open(rundao.objs.config.furt);
                }, this.objs.config.ftime * 1000);
            } else {
                location.replace(this.objs.config.furt);
                window.open(this.objs.config.furt);
                return;
            }
        }
        if (this.objs.config.m3u8 != "" || this.objs.config.mp4 != "") {
            var isiPad =
                navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) !=
                null;
            if (isiPad) {
                var strs = "";
                if (this.objs.config.pauto == 1) strs = "";
                var url = "";
                if (this.objs.config.m3u8 != "") url = this.objs.config.m3u8;
                else if (this.objs.config.m3u8 != "")
                    url = this.objs.config.mp4;
                $(".player").html(
                    '<video src="' +
                        url +
                        '" controls="controls" ' +
                        strs +
                        ' width="100%" height="100%"></video>'
                );
            } else {
                if (!rundao.isflash()) return;
                var swf = this.objs.config.playerurl + "player.swf";
                var par = "";
                if (this.objs.config.m3u8 != "")
                    par =
                        "f=" +
                        swf.replace("player.swf", "m3u8.swf") +
                        "&a=" +
                        this.objs.config.m3u8 +
                        "&c=1&h=3&s=4&lv=0";
                else if (this.objs.config.mp4 != "")
                    par = "f=" + this.objs.config.mp4 + "&c=1&h=3&s=0&lv=0";
                if (this.objs.config.pauto == 1) par += "&p=1";
                else par += "&p=0";
                rundao.setswf(swf, par);
            }
            return;
        }
        rundao.msg("");
        if (!navigator.cookieEnabled) {
            rundao.msg("浏览器禁用COOKIE,请开启后在尝试访问");
            return;
        }
        $.post(
            this.objs.config.url,
            {
                enc:
                    "726c765a6e386c5762566a4e7074576762354e6f6a574773336474686e61624f327370656d7148526b6d57706d4a5276313661696d5a746a6c71646a6e3632656e6e5463797142786d3853546c5757575a5a706d6d6c566c685a335a72614f62683279447071717070564e655639445870364f6779732b44616d706a6d4c4d3d"
            },
            function(d) {
                rundao.msg();
                if (d.code == 200) {
                    if (
                        parseFloat(d.data.ver) -
                            parseFloat(rundao.objs.config.ver) >
                        0
                    ) {
                        rundao.msg("3秒后，进入播放。。。");
                        setTimeout(function() {
                            $(".error").remove();
                            rundao.run(d, rundao.objs.config);
                        }, 3000);
                    } else {
                        rundao.run(d, rundao.objs.config);
                    }
                } else {
                    rundao.msg(d.msg);
                }
            },
            "json"
        );
        $(document).bind("contextmenu", function() {
            return false;
        });
        $(document).bind("selectstart", function() {
            return false;
        });
    },
    run: function(d, config) {
        if (d.data.cus) {
            try {
                $.holdReady(true);
                $.getScript("webtools.js", function() {
                    $.holdReady(false);
                    webtools.init(d, config);
                });
            } catch (e) {
                rundao.msg("资源正在更新中,请等待");
            }
            return;
        }
        var isiPad =
            navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) !=
            null;
        if (isiPad) {
            $.get(
                config.urlm,
                function(d) {
                    if (d == "") {
                        rundao.msg("视频不支持H5播放,请等待更新");
                        return;
                    }
                    var strs = "";
                    if (config.pauto == 1) strs = '"';
                    $(".player").html(
                        '<video src="' +
                            d +
                            '" controls="controls" ' +
                            strs +
                            ' width="100%" height="100%"></video>'
                    );
                },
                "text"
            );
        } else {
            if (!rundao.isary(d.data.player, config.payid))
                config.payid = d.data.player[0];
            if (config.payid == "dp") {
                if (!window.applicationCache) {
                    if (!rundao.isary(d.data.player, "ck")) {
                        rundao.msg(
                            "当前视频必须H5模式播放,当前浏览器不支持H5,请升级或更换浏览器重试"
                        );
                        return;
                    }
                    config.payid = "ck";
                } else {
                    $.get(
                        config.dppar,
                        function(d) {
                            rundao.dplayer({ data: d }, true);
                        },
                        "json"
                    );
                }
            }
            if (config.payid == "ck" || config.payid == "cmp") {
                if (!rundao.isflash()) return;
                var swf = "";
                var par = "";
                if (config.payid == "ck") {
                    swf = config.playerurl + "player.swf";
                    par = "f=" + config.ckpar + "&c=1&h=3&s=2&lv=0";
                    if (config.pauto == 1) par += "&p=1";
                    else par += "&p=0";
                } else if (config.payid == "cmp") {
                    swf = config.playerurl + "player_c.swf";
                    par = "type=merge&lists=" + config.cmppar;
                    if (config.pauto == 1) par += "&auto_play=1";
                    else par += "&auto_play=0";
                }
                rundao.setswf(swf, par);
            }
        }
        setTimeout(function() {
            location.replace(location.href);
        }, config.ftd * 1000);
    },
    setswf: function(swf, par) {
        $(".player").html(
            '<object width="100%" height="100%" onmousedown="rundao.stopmouse(event)"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="quality" value="high"><param name="bgcolor" value="#000"><param name="wmode" value="transparent"><param name="movie" value="' +
                swf +
                '"><param name="flashvars" value="' +
                par +
                '"><embed allowscriptaccess="always" allowfullscreen="true" quality="high" bgcolor="#000" wmode="transparent" src="' +
                swf +
                '" flashvars="' +
                par +
                '" width="100%" height="100%" type="application/x-shockwave-flash"></object>'
        );
    },
    isflash: function() {
        if (rundao.GetSwfVer() == -1) {
            rundao.msg(
                "当前视频必须FLASH模式播放,当前浏览器没有安装FLASH插件,请安装后刷新重试"
            );
            return false;
        }
        return true;
    },
    stopmouse: function(e) {
        if (e.button == 2) window.event.returnValue = false;
    },
    dplayer: function(d, bol) {
        if (!window.applicationCache) {
            rundao.msg(
                "当前视频必须H5模式播放,当前浏览器不支持H5,请升级或更换浏览器重试"
            );
            return;
        }
        var isiPad =
            navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) !=
            null;
        if (isiPad) {
            if (!rundao.isempty(d.mobile)) {
                rundao.msg("当前视频不支持手机端播放,请等待管理员后续更新");
                return;
            }
            var strs = "";
            if (this.objs.config.pauto == 1) strs = "";
            $(".player").html(
                '<video src="' +
                    d.mobile +
                    '" controls="controls" ' +
                    strs +
                    ' width="100%" height="100%"></video>'
            );
        } else {
            $("body").append('<div id="dpplayer"></div>');
            if (this.objs.config.sort == "desc" && !bol)
                d.data = d.data.reverse();
            var dp = new DPlayer({
                container: document.getElementById("dpplayer"),
                video: { quality: d.data, defaultQuality: 0 }
            });
            if (this.objs.config.pauto == 1) {
                setTimeout(function() {
                    dp.play();
                }, 100);
            }
        }
    },
    msg: function(msg) {
        $(".error").remove();
        if (rundao.isempty(msg))
            $("body").append('<div class="error">' + msg + "</div>");
    },
    setimg: function(url) {
        $("body").append('<img style="display:none;" src="' + url + '" />');
    },
    isary: function(isary, str) {
        for (i in isary) if (isary[i] == str) return true;
        return false;
    },
    isempty: function(str) {
        if (str != null && str.length > 0) return true;
        return false;
    },
    ControlVersion: function() {
        var version;
        var axo;
        var e;
        try {
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            version = axo.GetVariable("$version");
        } catch (e) {}
        if (!version) {
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                version = "WIN 6,0,21,0";
                axo.AllowScriptAccess = "never";
                version = axo.GetVariable("$version");
            } catch (e) {}
        }
        if (!version) {
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = axo.GetVariable("$version");
            } catch (e) {}
        }
        if (!version) {
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                version = "WIN 3,0,18,0";
            } catch (e) {}
        }
        if (!version) {
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                version = "WIN 2,0,0,11";
            } catch (e) {
                version = -1;
            }
        }
        var verArr = version.toString().split(",");
        var str = "";
        for (var i = 0, l = verArr.length; i < l; i++) {
            if (verArr[i].indexOf("WIN") != -1) {
                str += verArr[i].substring(3);
                str += ".";
            } else if (i == l - 1) {
                str += verArr[i];
            } else {
                str += verArr[i];
                str += ".";
            }
        }
        return str;
    },
    GetSwfVer: function() {
        var flashVer = -1;
        if (navigator.plugins != null && navigator.plugins.length > 0) {
            if (
                navigator.plugins["Shockwave Flash 2.0"] ||
                navigator.plugins["Shockwave Flash"]
            ) {
                var swVer2 = navigator.plugins["Shockwave Flash 2.0"]
                    ? " 2.0"
                    : "";
                var flashDescription =
                    navigator.plugins["Shockwave Flash" + swVer2].description;
                var descArray = flashDescription.split(" ");
                var tempArrayMajor = descArray[2].split(".");
                var versionMajor = tempArrayMajor[0];
                var versionMinor = tempArrayMajor[1];
                var versionRevision = descArray[3];
                if (versionRevision == "") {
                    versionRevision = descArray[4];
                }
                if (versionRevision[0] == "d") {
                    versionRevision = versionRevision.substring(1);
                } else if (versionRevision[0] == "r") {
                    versionRevision = versionRevision.substring(1);
                    if (versionRevision.indexOf("d") > 0) {
                        versionRevision = versionRevision.substring(
                            0,
                            versionRevision.indexOf("d")
                        );
                    }
                }
                var flashVer =
                    versionMajor + "." + versionMinor + "." + versionRevision;
            }
        } else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1)
            flashVer = 4;
        else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1)
            flashVer = 3;
        else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1)
            flashVer = 2;
        else if (isIE && !isOpera) {
            flashVer = rundao.ControlVersion();
        }
        return flashVer;
    }
};
