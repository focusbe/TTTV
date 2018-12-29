const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const lodashId = require('lodash-id');
const Aria2 = require('./aria2.js');
class TTDownload {
    constructor(config) {
        this.config = {
            dbfile: path.join(__dirname, './data/db.json'),
            dir: path.join(__dirname, './downloads/'),
            maxLength: 10,
            engin: 'auto'
        }
        this.taskList = [];
        Object.assign(this.config, config);
        var adapter = new FileSync(this.config.dbfile);
        this.db = low(adapter);
        this.db._.mixin(lodashId)
        this.db.defaults({
                task: []
            })
            .write();
        this.defaulttask = {
            path: this.config.dir,
            filename: '',
            status: 'waiting',
            percent: 0,
            poster: '',
            engin: 'auto',
            downid: ''
        }
        this.callbackPool = {};
        this.startedDownids = {};
        if (this.config.engin == 'auto') {
            this.aria2 = new Aria2({
                dir: this.config.dir
            });
        }
    }

    async pause(id) {
        if (!id) {
            return fasle;
        }
        var item = this.getById(id).value();
        if (!item || !item.downid) {
            return false;
        }
        var engin = this.getEngin(item);
        try {
            var res = await engin.pause(item.downid);
            return res;
        } catch (error) {
            return false;
        }
    }

    async pauseAll() {
        var res = await this.aria2.pauseAll();
        return res;
    }

    async resume(id) {
        if (!id) {
            return fasle;
        }
        var item = this.getById(id).value();
        if (!item || !item.downid) {
            return false;
        }
        var engin = this.getEngin(item);
        try {
            var res = await engin.resume(item.downid);
            return res;
        } catch (error) {
            return false;
        }
    }

    async getStatus() {
        // return this.aria2.getStatus();
    }

    async resumeAll() {
        var res = await this.aria2.resumeAll();
        return res;
    }

    getEngin(item) {
        if (!item || item.engin) {
            return false;
        }
        if (item.engin == 'aria2') {
            return this.aria2;
        } else if (item.engin == 'thunder') {
            return this.thunder;
        }
        return false;
    }

    async init() {
        if (this.config.engin == 'auto') {
            try {
                var res = await this.aria2.init();
                this.bind();
                return res;
            } catch (error) {
                console.log(error);
                return false;
            }
        } else {
            return true;
        }
    }

    on(event,callback){
        if(!this.callbackPool[event]){
            this.callbackPool[event] = [];
        }
        this.callbackPool[event].push(callback);
    }

    bind() {
        var self = this;
        this.aria2.on('start', function (task) {
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                if (!!value) {
                    value = item.set('status', 'active').write();
                    self.callCallback(value,'start');

                }
                else{
                    self.startedDownids[task] = true;
                }
            }
        })
        this.aria2.on('error', function (task) {
            self.startedDownids[task] = false;
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                if (!!value) {
                    value = item.set('status', 'error').write();
                    self.callCallback(value,'start');

                }
            }
        })
        this.aria2.on('complete', function (task) {
            self.startedDownids[task] = false;
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                if (!!value) {
                    value = item.set('status', 'complete').write();
                    self.callCallback(value,'complete');
                }
            }
        })
        this.aria2.on('pause', function (task) {
            self.startedDownids[task] = false;
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                if (!!value) {
                    value = item.set('status', 'waiting').write();
                    self.callCallback(value,'pause');
                }
            }
        })
        this.aria2.on('stop', function (task) {
            self.startedDownids[task] = false;
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                if (!!value) {
                    value = item.set('status', 'stoped').write();
                    self.callCallback(value,'stop');
                }
            }
        })
        this.aria2.on('progress', function (task) {
            if (!!task && !!task.gid) {
                var item = self.getByDownId(task.gid);
                var value = item.value();
                
                if (!!value) {
                    value.downloadInfo = task;
                    self.callCallback(value,'progress',task);
                }
            }
        })
    }
    getById(id) {
        return this.db.get('task').find({
            id: id
        });
    }

    getByDownId(downid) {
        if (!downid) {
            return false;
        }
        return this.db.get('task').find({
            downid: downid
        });
    }

    getList() {
        var res = this.db.get('task').value();
        return res;
    }
    findTask(uri, status) {
        if (!uri) {
            return -1;
        }
        var where = {
            uri: uri
        }
        if (!!status) {
            where['status'] = status
        }
        return this.db.get('task').find(where).value();
    }
    async addTask(params) {
        var self = this;
        params = Object.assign({}, this.defaulttask, params);
        params.createtime = new Date().getTime();
        if (!params.uri) {
            return -1;
        }
        var callbacks = {};
        for (var i in params) {
            if (typeof (params[i]) == 'function') {
                callbacks[i] = params[i];
                delete params[i];
            }
        }
        var res = this.db.get('task')
            .insert(params)
            .write();
        if (res && res.id) {
            self.callbackPool[res.id] = callbacks;
            console.log(self.callbackPool);
        }
        if (res) {
            var task = await this.aria2.addTask(params.uri);
            if (task) {
                res = self.getById(res.id).set('engin', 'arai2').set('downid', task).write();
                if(!!self.startedDownids[task]){
                    self.callCallback(res,'start');
                }
            }
            else{
                res = self.getById(res.id).set('engin', 'arai2').set('status','error').write();
                self.callCallback(res,'error');
            }
            return res;
        }
        return -2;
    }

    callCallback(task,event){
        if(!!this.callbackPool[event]&&typeof(this.callbackPool[event])=='object'){
            for(var i in this.callbackPool[event]){
                if(typeof(this.callbackPool[event][i])=='function'){
                    this.callbackPool[event][i](task);
                }
            }
        }
    }

    async removeTask(id) {
        if (!id) {
            return false;
        }
        var item = this.db.get('task').find({
            id: id
        }).value();

        if (item) {

            if (item.engin == 'arai2' && !!item.downid) {
                let res = await this.aria2.remove(item.downid);
                if (!res) {
                    return false;
                } else {
                    var remove = this.db.get('task').remove({
                        id: id
                    }).write();
                    return remove;
                }
            } else {
                return -2;
            }

        } else {
            return -1;
        }
    }
}
module.exports = TTDownload;