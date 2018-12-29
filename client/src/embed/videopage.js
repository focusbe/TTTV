

var TTTV = {
    ready: false,
    mode: 0,
    videodata: null,
    clock: null,
    init: function () {
        var self = this;
        if (typeof (rundao) == 'object') {
            this.mode = 1;
            self.getVideoData(function (bool, result) {
                if (bool) {
                    if (result.data.cus) {
                        var time = 0;
                        self.clock = setInterval(function () {
                            time += 500;
                            if (typeof (window.webtools) != 'undefined') {
                                time = 0;
                                clearInterval(self.clock);
                                self.ready = true;
                                self.getPlayList(function (data) {
                                    // console.log(data);
                                    console.log('dlanurl ');
                                    console.log(data);
                                    window.top.TTTV.getPlayListCallback(data);
                                });
                                return;
                            }
                            if (time >= 10000) {
                                time = 0;
                                clearInterval(self.clock);
                            }
                        }, 500);
                    }
                    else {
                        
                        var config = rundao.objs.config;
                        var d = result;
              
                        $.get(
                            config.urlm,
                            function (d) {
                                if (d == "") {
                                    rundao.msg("视频不支持H5播放,请等待更新");
                                    return;
                                }
                                window.top.TTTV.getPlayListCallback([{
                                    name:'自动',
                                    url:d,
                                    type:'m3u8'
                                }]);
                            },
                            "text"
                        );
                    }

                }
                else {
                    console.log('获取视频信息失败');
                }
            });


        }
        else if (typeof (yunparse) == 'object') {
            this.mode = 2;
            this.ready = true;
            this.getPlayList(function (data) {
                console.log('dlanurl ');
                console.log(data);
                window.top.TTTV.getPlayListCallback(data);
                console.log(data);
            });
        }
        else if (typeof (WWW_URL) == 'string') {
            this.mode = 3;
            this.ready = true;
            this.getPlayList(function (data) {
                console.log('dlanurl ');
                console.log(data);
                window.top.TTTV.getPlayListCallback(data);
                console.log(data);
            });
        }
        else {
            console.log('未知模式');
        }
    },
    getVideoData: function (callback) {
        var reg = /{enc:'(.*)'}/i;
        var initstring = rundao.init.toString();
        var arr = initstring.match(reg);
        console.log(arr);
        if (!!arr[1]) {
            var enc = arr[1];
        }
        if (!enc) {
            callback(false, '获取enc失败');
            return;
        }
        var self = this;
        if (!!self.videodata) {
            callback(true, self.videodata);
        }
        $.post(
            rundao.objs.config.url,
            {
                enc: enc
            },
            function (data) {
                if (data.code == 200) {
                    if (typeof (callback) == 'function') {
                        console.log(data);
                        self.videodata = data;
                        callback(true, data);
                    }
                } else {
                    callback(false, data.msg);
                }
            },
            "json"
        );
    },
    getPlayList: function (callback) {
        var self = this;
        if (!this.ready) {
            return;
        }
        console.log('获取视频播放列表');
        if (this.mode == 1) {
            if (!this.videodata || !webtools) {
                return;
            }
            var config = webtools.objs.config;
            var d = this.videodata;
            console.log(d);
            console.log(config);
            switch (d.data.cus) {
                case 'youku':
                    this.csrf_youku(d.data.vid, 'ups.youku.com', '03020101', callback);
                    break;
                case 'tudou':
                    this.csrf_youku(d.data.vid, 'ups.cp31.ott.cibntv.net', '050F', 'DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND', callback);
                    break;
                case 'qqv':
                    this.csrf_qqv(d.data.vid, callback);
                    break;
                case 'iqiyi':
                    this.csrf_iqiyi(d.data.vid, callback);
                    break;
            }
        }
        else if (this.mode == 2) {

            if (!yunparse.url) {
                callback(false);
            } else if (!yunparse.referer) {
                gcallback(false);
            } else if (!yunparse.cache) {
                callback(false);
            } else {
                $.post("api.php", {
                    "url": yunparse.url,
                    "up": yunparse.update,
                    "ip": cip
                }, function (data) {
                    console.log(data);
                    if (data['msg'] == 'ok' && data['url']) {
                        if (data['ext'] == 'post') {
                            var url = data['url']
                            $.getJSON(url + "&callback=?", function (json) {
                                if (json) {
                                    $.post("api.php", {
                                        "url": yunparse.url,
                                        "up": yunparse.update,
                                        "data": json
                                    }, function (data) {
                                        if (data['msg'] == 'ok' && data['url']) {
                                            callback([{
                                                name: '自动',
                                                type: 'hls',
                                                url: data.url
                                            }]);
                                        } else {
                                            callback(false);
                                        }
                                    });
                                } else {
                                    callback(false);
                                }
                            });
                        } else if (data['ext'] == 'ajax') {
                            var ajaxurl = data['url'];
                            TTTV['get_' + data['type']](ajaxurl, callback)
                            //eval('get_'+data['type']+'(ajaxurl);');
                        } else {
                            callback([{
                                name: '自动',
                                type: 'hls',
                                url: data.url
                            }]);
                        }
                    }
                    else {
                        callback(false);
                    }

                }, "json");
            }
        }
        else if (this.mode == 3) {
            $.post("baiyug.php", { "id": GetQueryString('url'), "type": GetQueryString('type'), "siteuser": '', "md5": sign($('#hdMd5').val()), "hd": "", "lg": "", "iqiyicip": iqiyicip },
                function (data) {


                    if (data['msg'] == 200) {
                        callback([{
                            name: '自动',
                            type: data.ext,
                            url: decodeURIComponent(data.url)
                        }]);
                        return;
                        if (data['ext'] == 'link') {
                            document.getElementById('a1').innerHTML = '<iframe width="100%" height="100%" allowFullScreen="true" allowTransparency="true" frameborder="0" scrolling="no" src="' + data['url'] + '"></iframe>';
                        } else if (isiPad || data['ext'] == 'h5') {

                        } else if (data['ext'] == 'mp4') {

                        } else if (data['ext'] == 'hls' || data['ext'] == 'hls_list') {

                        } else if (data['ext'] == 'client_parse') {

                        } else {
                            if (data['ext'] == 'm3u8' || data['ext'] == 'm3u8_list' || data['ext'] == 'm3u8_list_youku' || data['ext'] == 'm3u8_list_iqiyi') {

                            } else if (data['ext'] == 'xml') {

                            } else if (data['ext'] == 'xml_client') {

                            }

                        }

                        return false;
                    } else {

                    }
                }, "json");
        }
    },
    csrf_iqiyi: function (vid, callback) {
        var time = webtools.gettime();
        $.ajax({
            url: '//mixer.video.iqiyi.com/jp/mixin/videos/' + vid,
            async: false,
            dataType: 'text',
            success: function (d) {
                var json = JSON.parse(d.replace('var tvInfoJs=', ''));
                var vidm = json.vid;
                var turl = json.url;
                if (vidm == '' || json.isPurchase == 2) {
                    callback(false);
                    return false;
                }
                var param = {
                    uid: '',
                    cupid: 'qc_100001_100102',
                    src: '02020031010000000000',
                    platForm: 'h5',
                    qdv: 1,
                    qdx: 'n',
                    qdy: 'x',
                    qds: 0,
                    __jsT: 'sgve',
                    t: time,
                    type: 'm3u8'
                };
                var url = '/jp/tmts/' + vid + '/' + vidm + '/';
                var vf = md5(url + '?' + $.param(param) + '3sj8xof48xof4tk9f4tk9ypgk9ypg5ul');
                param.vf = vf;
                $.ajax({
                    url: '//cache.m.iqiyi.com' + url,
                    async: false,
                    data: param,
                    dataType: 'text',
                    success: function (d) {
                        var json = JSON.parse(d.replace('var tvInfoJs=', ''));
                        // return;
                        if (json.code != 'A00000') {
                            callback(false);
                            return;
                        }
                        var item = json.data.vidl;
                        if (item == '') {
                            callback(false);
                            return;
                        }
                        // var ary = new Object();
                        var arys = new Array();

                        for (var key in item) {
                            var obj = item[key];
                            if (obj.m3utx != '') {
                                switch (obj.vd) {
                                    case 96:
                                        arys[0] = {
                                            name: '流畅',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                    case 1:
                                        arys[1] = {
                                            name: '标清',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                    case 2:
                                        arys[2] = {
                                            name: '高清',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                    case 4:
                                        arys[3] = {
                                            name: '超清',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                    case 5:
                                        arys[4] = {
                                            name: '蓝光',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                    case 10:
                                        arys[5] = {
                                            name: '原画',
                                            type: 'hls',
                                            url: obj.m3utx
                                        };
                                        break;
                                }
                            }
                        }
                        callback(arys);
                        // ary.url = arys[arys.length-1].url;

                    }
                });
            }
        });
    },
    csrf_youku: function (vid, url, code, ckey, callback) {
        var time = webtools.gettime();
        $.ajax({
            url: '//log.mmstat.com/eg.js',
            dataType: 'script',
            async: false,
            success: function () {
                var utid = window.goldlog.Etag;
                document.cookie = 'cna=' + utid + ';';
                $.ajax({
                    url: '//' + url + '/ups/get.json',
                    dataType: 'jsonp',
                    jsonpCallback: 'json' + time,
                    async: false,
                    data: {
                        vid: vid,
                        ccode: code,
                        client_ip: '192.168.1.1',
                        utid: utid,
                        client_ts: time,
                        ckey: ckey
                    },
                    success: function (e) {

                        var ary = new Object();
                        var arys = new Array();
                        for (var key in e.data.stream) {
                            var obj = e.data.stream[key];
                            switch (obj.stream_type) {
                                case '3gphd':
                                    arys[0] = {
                                        name: '流畅',
                                        type: 'mp4',
                                        url: obj.m3u8_url
                                    };
                                    break;
                                case 'flvhd':
                                    arys[1] = {
                                        name: '标清',
                                        type: 'mp4',
                                        url: obj.m3u8_url
                                    };
                                    break;
                                case 'mp4hd':
                                case 'mp4sd':
                                    arys[2] = {
                                        name: '高清',
                                        type: 'mp4',
                                        url: obj.m3u8_url
                                    };
                                    break;
                                case 'mp4hd2':
                                case 'mp4hd2v2':
                                    arys[3] = {
                                        name: '超清',
                                        type: 'mp4',
                                        url: obj.m3u8_url
                                    };
                                    break;
                                case 'mp4hd3':
                                case 'mp4hd3v2':
                                    arys[4] = {
                                        name: '蓝光',
                                        type: 'mp4',
                                        url: obj.m3u8_url
                                    };
                                    break;
                            }
                        }
                        ary.url = arys[arys.length - 1].url;
                        ary.mobile = ary.url;
                        callback(arys);
                    },
                    error: function () {
                        callback(false);
                    }
                });
            }
        });
    },
    csrf_qqv: function (vid, callback) {
        var time = webtools.gettime();
        var guid = webtools.createGUID();
        var platform = '10201';//webtools.getPlatform();
        var stdfrom = 'v1010';//webtools.getStdfrom(platform);
        webtools.getPushGuid(vid, guid, platform, '');
        $.ajax({
            url: '//vd.l.qq.com/proxyhttp',
            async: false,
            type: 'POST',
            dataType: 'json',
            crossDomain: !0,
            xhrFields: {
                withCredentials: !0
            },
            contentType: 'text/plain',
            data: JSON.stringify({
                adparam: '',
                buid: 'vinfoad',
                vinfoparam: $.param({
                    charge: 0,
                    defaultfmt: 'auto',
                    otype: 'json',
                    guid: guid,
                    flowid: webtools.createGUID() + '_' + platform,
                    platform: platform,
                    sdtfrom: stdfrom,
                    defnpayver: 1,
                    appVer: '3.5.40',
                    refer: 'http://film.qq.com/film_index_prevue/index.html?firstVid=' + vid,
                    host: 'film.qq.com',
                    ehost: 'http://film.qq.com/film_index_prevue/index.html',
                    tm: time,
                    spwm: 4,
                    vid: vid,
                    defn: 'mp4',
                    fhdswitch: 0,
                    show1080p: 0,
                    isHLS: 1,
                    dtype: 3,
                    defsrc: 1,
                    encryptVer: webtools.getencrypt(),
                    cKey: webtools.ckey7(vid, time, platform)
                })
            }),
            success: function (d) {
                var json = webtools.strsub(d.vinfo, 'QZOutputJson=', '};') + '}';
                json = JSON.parse(json);
                if (json.vl.vi[0].drm == 1) {
                    platform = '11001';
                    var qv = webtools.qv(platform, vid, stdfrom, 1, time);
                    $.ajax({
                        url: '//h5vv.video.qq.com/getinfo',
                        async: false,
                        dataType: 'jsonp',
                        jsonpCallback: 'jsonp' + time,
                        data: {
                            charge: 0,
                            defaultfmt: 'auto',
                            otype: 'json',
                            guid: guid,
                            flowid: webtools.createGUID() + '_' + platform,
                            platform: platform,
                            sdtfrom: stdfrom,
                            defnpayver: 0,
                            appVer: '3.3.367',
                            host: 'm.v.qq.com',
                            ehost: 'http://m.v.qq.com/play.html?vid=' + vid,
                            _rnd: time,
                            spwm: 4,
                            vid: vid,
                            defn: 'mp4',
                            fhdswitch: 0,
                            show1080p: 0,
                            isHLS: 0,
                            fmt: 'auto',
                            defsrc: 1,
                            dtype: 1,
                            clip: 4,
                            sphls: 0,
                            _qv_rmt: qv.u1,
                            _qv_rmt2: qv.u2
                        },
                        success: function (d) {
                            var url = d.vl.vi[0].ul.ui[1].url + d.vl.vi[0].fn + '?sdtfrom=' + stdfrom + '&guid=' + guid + '&vkey=' + d.vl.vi[0].fvkey.substring(0, 64) + '&platform=2';
                            //url = url.replace('http:', '');
                            callback([
                                {
                                    name: '自动',
                                    type: 'mp4',
                                    url: url
                                }
                            ]);
                            // return;
                            // webtools.getPushGuid(vid,guid,platform,url);
                            // rundao.dplayer({data:[{
                            //     name:'自动',
                            //     type:'mp4',
                            //     url:url
                            // }],mobile:url});
                        }
                    });
                } else {
                    if (json.dltype == 3) {
                        var url = json.vl.vi[0].ul.ui[1].url + json.vl.vi[0].ul.ui[0].hls.pt;
                        //url = url.replace('http:', '');
                        url = url.replace('ltsdl.qq.com', 'stsws.qq.com');
                        callback([
                            {
                                name: '自动',
                                type: 'mp4',
                                url: url
                            }
                        ]);
                    } else if (json.dltype == 1) {
                        var url = json.vl.vi[0].ul.ui[1].url + json.vl.vi[0].fn + '?sdtfrom=' + stdfrom + '&guid=' + guid + '&vkey=' + json.vl.vi[0].fvkey + '&platform=2';
                        //url = url.replace('http:', '');
                        callback([
                            {
                                name: '自动',
                                type: 'mp4',
                                url: url
                            }
                        ]);
                    }
                }
            }
        });
    },
    get_qiyis: function (url, callback) {
        $.ajax({
            url: url.replace('http:', ''),
            dataType: 'jsonp',
            jsonpCallback: "callbackfunction",
            success: function (json) {
                if (json.code == 'A00000') {
                    var data = {};

                    data['url'] = json.data.m3u;
                    data['type'] = 'm3u8';
                    data['name'] = '自动'
                    callback([data])

                } else {
                    callback(null)
                }
            }
        });
    },
    get_qq: function (url, callback) {
        var get = getQuery(url);
        $.ajax({
            url: "//h5vv.video.qq.com/getinfo?charge=0&vid=" + get.vid + "&defaultfmt=auto&otype=json&guid=" + get.guid + "&platform=" + get.platform + "&defnpayver=1&appVer=3.0.83&sdtfrom=" + get.sdtfrom + "&host=v.qq.com&ehost=https%3A%2F%2Fv.qq.com%2Fx%2Fcover%2Fnuijxf6k13t6z9b%2Fl0023olk3g4.html&_0=" + get._0 + "&defn=mp4&fhdswitch=0&show1080p=1&isHLS=0&newplatform=" + get.sdtfrom + "&defsrc=1&_1=" + get._1 + "&_2=" + get._2,
            dataType: 'jsonp',
            jsonpCallback: "txplayerJsonpCallBack_getkey_" + parseInt(Math.random() * 800000 + 80000),
            success: function (getinfo) {
                if (!getinfo.exem) {
                    $.ajax({
                        url: url + '&filename=' + getinfo.vl.vi[0].lnk + '.mp4',
                        dataType: 'jsonp',
                        jsonpCallback: "txplayerJsonpCallBack_getkey_" + parseInt(Math.random() * 800000 + 80000),
                        success: function (json) {
                            var data = {};
                            data['type'] = 'h5';
                            data['url'] = getinfo.vl.vi[0].ul.ui[0].url + json.filename + '?sdtfrom=' + get.sdtfrom + '&guid=' + get.guid + '&vkey=' + json.key;
                            callback([data])
                        }
                    })
                } else {
                    callback(false)
                }
            }
        });
    },
    get_youku: function (url, callback) {
        var get = getQuery(url);
        var data = {};
        var aurl = 'hd=' + get.hd + '&vid=' + get.vid + '&code=' + get.code + '&swf=' + get.swf + '&site=youku&yunkey=' + yunparse.url;
        data['url'] = yunparse.webpath + 'a6/key.php?xml=' + encodeURIComponent(encodeURIComponent(aurl));
        data['type'] = 'xml';
        data['name'] = '自动';
        callback([data])
    },
    get_letv: function (url, callback) {
        $.getJSON(url.replace('http:', '') + "&jsonp=?", function (json) {
            console.log(json);
            if (json.status == '200') {
                var data = {};
                var vod = json.nodelist;
                for (var i = 0; i < vod.length; i++) {
                    if (vod[i]['location'].indexOf(':110/') < 0) {
                        data['url'] = vod[i]['location'];
                        break;
                    }
                }

                data['url'] = data['url'];
                data['type'] = 'm3u8';
                data['name'] = '自动';
                callback([data])
            } else {
                callback(null);
            }
        });
    },

}
function getQuery(url) {
    if (typeof url !== 'string') return null;
    var query = url.match(/[^\?]+\?([^#]*)/, '$1');
    if (!query || !query[1]) return null;
    var kv = query[1].split('&');
    var map = {};
    for (var i = 0, len = kv.length; i < len; i++) {
        var result = kv[i].split('=');
        var key = result[0],
            value = result[1];
        map[key] = value || (typeof value == 'string' ? null : true);
    }
    return map;
}
TTTV.init();