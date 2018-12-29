<template>

    <div class="download_wrap" v-bind:data-href="version">
        
        <mu-text-field v-model="downloadurl"/> <mu-raised-button  @click="addTask(downloadurl)" label="下载" /><br/>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="active" title="下载中" />
            <mu-tab value="waiting" title="等待中" />
            <mu-tab value="stopped" title="完成" />
        </mu-tabs>
        <div>
            <mu-table :showCheckbox=false ref="table" class="downloadtable">
                <mu-thead slot="header">
                    <mu-tr>
                        <mu-th tooltip="文件名">文件名</mu-th>
                        <mu-th tooltip="进度">进度</mu-th>
                        <mu-th tooltip="速度">速度</mu-th>
                        <mu-th tooltip="速度">操作</mu-th>
                    </mu-tr>
                </mu-thead>
                <mu-tbody>
                    <mu-tr v-for="item in downloadList[activeTab]">
                        <mu-td>{{getFileName(item)}}</mu-td>
                        <mu-td>{{getPercent(item)}}</mu-td>
                        <mu-td>{{getSpeed(item)}}</mu-td>
                        <mu-td>
                            <mu-icon-button @click="remove(item.gid)" icon="close" />
                            <mu-icon-button @click="viewfile(item)" icon="folder" />

                            <mu-icon-button v-if="item.status=='active'" @click="pause(item.gid)" icon="pause" />
                            <mu-icon-button v-if="item.status=='paused'" @click="resume(item.gid)" icon="play_arrow" />
                        </mu-td>
                    </mu-tr>
                </mu-tbody>
            </mu-table>
        </div>
    </div>
</template>
<style lang="scss">
.downloadtable {
    td,
    th {
        text-align: center;
        overflow: hidden;
    }
}
</style>

<script>

const TTDownload = require('bin/ttdownload');

const { shell } = require("electron");
const fs  = require('fs');

function ucfirst(str) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}
export default {
    name: "download",
    data() {
        return {
            version: 1,
            downloadList: {},
            activeTab: "active",
            downloadurl:'',
             

        };
    },
    created() {
        this.initdownload();
    },

    mounted: function() {
        // this.addTask(
        //     "http://xunleib.zuida360.com/1805/black.panther.BD1280高清中英双字版.mp4"
        // );

    },
    methods: {
        remove(id) {
            this.aria2.remove(gid);
        },

        viewfile(item) {
            if(fs.existsSync(item["files"][0]["path"])){
                shell.openItem(item["files"][0]["path"]);
            }
            else{
                alert('文件不存在');
            }
            
        },
        getFileName(item) {
            if (
                !!item["files"] &&
                item["files"].length > 0 &&
                !!item["files"][0]["path"]
            ) {
                var patharr = item["files"][0]["path"].split("/");
                return patharr[patharr.length - 1];
            }
            return "";
        },
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
        },
        getSpeed(item) {
            return parseInt(item.downloadSpeed / 1024 * 10) / 10 + "KB";
        },
        handleTabChange(val) {
            this.activeTab = val;
        },
        handleActive() {
            window.alert("tab active");
        },
        show() {},
        refresh() {
            this.version += 1;
        },

        pause(gid) {
            if (!!gid) {
                this.aria2.pause(gid);
            }
        },
        resume(gid) {
            if (!!gid) {
                this.aria2.unpause(gid);
            }
        },
        resumeAll() {
            this.aria2.unpauseAll(gid);
        },

        pauseAll() {
            this.aria2.pauseAll();
        },
        addTask(url, img, title) {
            alert(url);
            if (!url) {
                return false;
            }
            this.aria2.addUri([url]);
            return true;
        },
        refreshList() {
            var self = this;
            self.getDownArray("active").then(res => {
                //console.log(res);
            });
            self.getDownArray("waiting").then(res => {
                //console.log(res);
            });
            self.getDownArray("stopped").then(res => {
                // console.log(res);
            });
            return;
            // console.log("refreshlist");
            var gid;

            var promiselist = [];
            for (var i in this.downloadList) {
                for (var j in this.downloadList[i]) {
                    gid = this.downloadList[i][j];
                    promiselist.push(self.getDownStatus(gid));
                }
            }
            Promise.all(promiselist).then(res => {
                //console.log(self.downloadList);
                self.refresh();
            });
        },
        initdownload: function() {
            var self = this;
            var aria2 = new Aria2({
                host: "localhost",
                port: 6800,
                secure: false,
                secret: "focusbetv",
                path: "/jsonrpc"
            });
            self.aria2 = aria2;
            aria2.onopen = function(a, b) {
                console.log("aria2 open");
                try {
                    self.getDownArray("active").then(res => {
                        console.log(res);
                    });
                    self.getDownArray("waiting").then(res => {
                        console.log(res);
                    });
                    self.getDownArray("stopped").then(res => {
                        console.log(res);
                    });
                    setInterval(function() {
                        self.refreshList();
                    }, 1000);
                } catch (error) {
                    console.log(error);
                }
            };
            aria2.onDownloadStart = function(gid) {
                console.log("downloadstart");
                console.log(gid);
            };
            aria2.onDownloadError = function(gid) {
                console.log("onDownloadError");
                console.log(gid);
                aria2.getFiles(gid.gid, function(res, data) {
                    console.log(res || data);
                });
            };
            aria2.open(function() {}, function() {});
        },
        getDownArray(type, page) {
            if (!page) {
                page = 1;
            }
            if (!type) {
                return false;
            }
            var self = this;
            var method = "";
            var promise = new Promise(function(resolve, reject) {
                if (typeof self.aria2["tell" + ucfirst(type)] == "function") {
                    if (type == "active") {
                        self.aria2["tell" + ucfirst(type)](function(
                            error,
                            result
                        ) {
                            if (!error) {
                                self.$set(self.downloadList, type, result);
                                //self.downloadList[type] = result;
                                //console.log(self.downloadList);
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        });
                    } else {
                        self.aria2["tell" + ucfirst(type)](
                            (page - 1) * 10,
                            page * 10 - 1,
                            function(error, result) {
                                //console.log('tell'+method.toUpperCase());
                                if (!error) {
                                    self.$set(self.downloadList, type, result);
                                    //self.downloadList[type] = result;
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
        },
        getDownStatus: function(gid) {
            var task;
            if (typeof gid == "object") {
                task = gid;
                gid = task.gid;
            }
            var self = this;
            return new Promise(function(resolve, reject) {
                self.aria2.tellStatus(gid, function(error, res) {
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
};
</script>
