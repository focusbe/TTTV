<template id="template">
    <div>
        <div class="topbar">
            <div class="search_outer">
                <form v-on:submit.prevent="search" action="javascrrpt:void(0)">
                    <input v-model="keyword" name="keyword" type="search">
                    <button type="submit" href="javascript:void(0)">全网搜</button>
                </form>
            </div>

            <div class="drag">

            </div>
            <div class="button_wrap">
                <mu-icon class="close" v-on:click="close" :size="24" value="close" />
            </div>
        </div>
        <div class="left_nav">
            <a class="logo" href="javascript:void(0)"></a>
            <ul>
                <li>
                    <a href=""></a>
                </li>
            </ul>
            <mu-badge class="downbtn" content="1" circle secondary>
                <mu-icon-button v-on:click="showDownpanel" icon="cloud_download" size="40" />
            </mu-badge>

        </div>
        <div class="main_content">
            <div class="loading_wrap" v-show="isLoading">
                <mu-circular-progress :size="40" />
            </div>
            <ul class="result_list" v-show="!isLoading">
                <li v-for="item in resultList">
                    <div class="left">
                        <a href="javascript:void(0)">
                            <img v-on:load="posterLoad" v-bind:src="item.img" alt="">
                        </a>
                    </div>
                    <div class="right">
                        <h2 class="result_title">
                            <a href="javascript:void(0)">
                                <em class="hl" v-html="item.title"></em>
                                <span class="sub"></span>
                                <span class="type">[{{item.playtype}}]</span>
                            </a>
                        </h2>

                        <div class="result_info">
                            <div class="info_item info_item_odd">
                                <span class="label">导　演：</span>
                                <span class="content">
                                    <span v-for="dir in item.directors" class="content">{{dir}} </span>
                                </span>
                            </div>
                            <div class="info_item info_item_even">
                                <span class="label">主　演：</span>
                                <span v-for="act in item.acts" class="content">{{act}} </span>
                            </div>
                            <div class="info_item info_item_desc">
                                <span class="label">简　介：</span>
                                <span class="desc_text" v-html="item.desc"></span>
                            </div>
                        </div>
                        <div class="play_wrap">
                            <ul v-bind:class="'playlist playlist_'+curPlaylist['source']" v-for="curPlaylist in item.playlist">
                                <li v-for="cururl in curPlaylist.list">
                                    <a v-on:click="playUrl(cururl.url,item.source)" href="javascript:void(0)" v-bind:title="cururl.title" v-bind:data-href="cururl.url" v-html="cururl.title"></a>
                                </li>
                            </ul>
                            <div class="tr">
                                <select class="source_list" @change="changeSource">
                                    <option v-for="curPlaylist in item.playlist" v-bind:class="'icon_'+curPlaylist['source']" v-bind:value="curPlaylist['source']">{{sourceName[curPlaylist['source']]||curPlaylist['source']}}</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
            <ul class="result_list" v-show="downList">
                <li v-for="item in downList">
                    <div class="left">
                        <a href="javascript:void(0)">
                            <img v-on:load="posterLoad" v-bind:src="item.img" alt="">
                        </a>

                    </div>
                    <div class="right">
                        <h2 class="result_title">
                            <a href="javascript:void(0)">
                                <em class="hl" v-html="item.title"></em>
                            </a>
                        </h2>

                        <div class="result_info">

                            <div class="info_item info_item_desc">
                                <span class="label">简　介：</span>
                                <span class="desc_text" v-html="item.desc"></span>
                            </div>
                        </div>
                        <div class="play_wrap">
                            <ul v-bind:class="'playlist playlist_'+curPlaylist['source']" v-for="curPlaylist in item.playlist">
                                <li v-for="cururl in curPlaylist.list">
                                    <a v-on:click="playUrl(cururl.url,'download')" href="javascript:void(0)" v-bind:title="cururl.title" v-bind:data-href="cururl.url" v-html="cururl.title"></a>
                                </li>
                            </ul>
                            <div class="tr">
                                <select class="source_list" @change="changeSource">
                                    <option v-for="curPlaylist in item.playlist" v-bind:class="'icon_'+curPlaylist['source']" v-bind:value="curPlaylist['source']">{{sourceName[curPlaylist['source']]||curPlaylist['source']}}</option>

                                </select>
                            </div>
                        </div>

                    </div>
                </li>
            </ul>
            <!-- <a href="thunder://QUFlZDJrOi8vfGZpbGV8MTLTwsq/LjcyMHAuSETW0NfWLm1wNHwxODY2MzI2MTI3fEYxNUZEMUJCNzczNjNGQkExQkEyOTNFRjFGQkVDMTJDfGg9Qks0MzVHTTNUNk9ES0VKVjI2MktSU09CSURUU0JUWEp8L1pa">下载</a> -->
            <!-- <download class="download_wrap" ref="download" v-if="showdown"></download> -->
        </div>
    </div>
</template>
<style lang="scss">
.download_wrap {
    width: 100%;
    height: auto;
    position: absolute;
    top: 20px;

    bottom: 0;
    left: 0;
    z-index: 100;
}
.downbtn {
    position: absolute;
    bottom: 10px;
    left: 55px;
}
</style>

<script>
import $ from "jquery";
import { setTimeout, setInterval } from "timers";
require("../js/ThunderURIEncode.js");
import Download from "../components/download.vue";

if (DEBUG) {
    var apiurl = "http://localhost:8081";
} else {
    var apiurl = "http://47.94.88.179:8081";
}
                                         
//apiurl = 'http://mytv.focusbe.com/api/index.php';
export default {
    components: { Download },
    data: function() {
        return {
            active: "home",

            cats: [],
            sourceName: {
                qiyi: "爱奇艺",
                qq: "腾讯",
                sohu: "搜狐",
                tudou: "土豆",
                levp: "乐视",
                cntv: "央视网",
                youku: "优酷",
                pptv: "PPTV",
                mgtv: "芒果TV",
                other: "其他",
                xunlei: "迅雷"
            },
            isLoading: false,
            keyword: localStorage.getItem("keyword"),
            resultList: [],
            downList: [],
            videosort: {
                qq: 0,
                qiyi: 1,
                levp: 2,
                youku: 3,
                tudou: 4,
                sohu: 5,
                cntv: 6
            },
            ariaList: {},
            showdown: false
        };
    },
    created() {},
    updated: function() {},
    mounted: function() {
        var self = this;

        Socket.on("alert", function(data) {
            alert(data);
        });
        Socket.on("update-downloaded", function(data) {
            var isinstall = confirm("发现新版本,是否重启并安装");
            if (isinstall) {
                //alert(1);
                Socket.sendTo("backend", "quitandinstall");
            }
        });
    },
    methods: {
        showDownpanel() {
            this.showdown = !this.showdown;
        },
        posterLoad: function(event) {
           (event.target.style.visibility = "visible");
        },
        changeSource: function(e) {
            var val = $(e.target).val();
            $(e.target)
                .parents(".right")
                .find(".playlist")
                .hide();
            $(e.target)
                .parents(".right")
                .find(".playlist_" + val)
                .show();
        },

        search: function() {
            this.resultList = [];
            this.downList = [];
            var self = this;
            if (!!self.getlist) {
                self.getlist.abort();
            }
            localStorage.setItem("keyword", self.keyword);
            this.isLoading = true;
            self.getlist = $.ajax({
                url: apiurl + "/search",
                data: {
                    keyword: self.keyword
                },
                type: "GET",
                dataType: "json",
                success: function(result) {
                    if (result && result.status && !!result.data) {
                        self.resultList = result.data;
                    }
                    console.log(self.resultList);
                },
                complete: function() {
                    self.isLoading = false;
                    self.getlist = null;
                }
            });
            this.getDownloadList(self.keyword);
        },
        getDownloadList(keyword) {
          
            this.downloadList = [];
            var self = this;
            if (!!self.downloaAjax) {
                self.downloaAjax.abort();
            }
            this.downloaAjax = $.ajax({
                url: apiurl + "/search",
                data: {
                    keyword: self.keyword,
                    from: "download"
                },
                type: "GET",
                dataType: "json",
                success: function(result) {
                    if (result && result.status && !!result.data) {
                        self.downList = result.data;
                    }
                    console.log(self.downList);
                },
                error(err){
                    console.log(err);
                },
                complete: function() {
                    self.downloaAjax = false;
                }
            });
        },
        close: function() {
            window.close();
        },
        playVideo: function(index) {
            var url = this.getVideoUrl(index);
            if (url) {
                Socket.sendTo(
                    "backend",
                    "playvideo",
                    url
                );
            } else {
                alert("暂时无法播放");
            }
        },
        playUrl: function(url, source) {
            if (source == "download") {
                // alert('下载'+url);
                console.log(url);
                //this.aria2.addUri([url]);
                Socket.sendTo('backend','openurl',ThunderURIEncode(url));
            } else {
                if (url) {
                    Socket.sendTo(
                        "backend",
                        "playvideo",
                        encodeURIComponent(url)
                    );
                } else {
                    alert("暂时无法播放");
                }
            }
        },
        openDownload: function() {
            //Socket.sendTo('backend','openpage',{id:'download',hash:'download/index',search:''});
        },
        getVideoUrl: function(index) {
            var playlist = this.resultList[index]["playlinks"];
            var playurl = "";
            if (!!playlist) {
                for (var i in this.videosort) {
                    if (!!playlist[i]) {
                        playurl = playlist[i];
                        return playurl;
                    }
                }
                for (var i in playlist) {
                    if (!!playlist[i]) {
                        playurl = playlist[i];
                        return playurl;
                    }
                }
            }
        }
    }
};
</script>