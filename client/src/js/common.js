
const ipcRenderer = require('electron').ipcRenderer;
window.Socket = {
    callback:{},
    init:function(){
        var self = this;
        ipcRenderer.on('senddata',function(sender,data){
            
            if(!data){
                return;
            }
            if(!!data.event&&typeof(self.callback[data['event']])=='function'){
                if(!data.data){
                    data.data = null;
                }
                self.callback[data['event']](data.data);
                
            }
        });
    },
    getData:function(name,callback){
        if(!name||!callback||(!window.WINDOWTAG&&window.top.WINDOWTAG)){
            return;
        }
        console.log(this);
        var self = this;
        var id = new Date().getTime();
        this.on('callbackdata_'+id,function(data){
            console.log(data);
            if(typeof(callback)=='function'){
                callback(data);
            }
            self.off('callbackdata_'+id);
        });
        console.log({name:name,windowtag:window.WINDOWTAG||window.top.WINDOWTAG,id:id});
        this.sendTo('backend','getdata',{name:name,windowtag:window.WINDOWTAG||window.top.WINDOWTAG,id:id});
    },
    sendTo:function(tag,event,data){
        if(!tag||!event){
            return;
        }
        if(!data){
            data = null;
        }
        ipcRenderer.send('senddata',{tag:tag,event:event,data:data});
    },
    sendAll:function(event,data){
        ipcRenderer.send('senddata',{tag:'ALLWINDOWS',event:event,data:data});
    },
    send:function(event,data){
        if(!event){
            return;
        }
        if(!data){
            data = null;
        }
        this.sendTo('main',event,data);
    },
    on:function(event,callback){
        //var self = this;
        this.callback[event] = callback;
    },
    off:function(event){
        try{
            delete this.callback[event];
        }
        finally{
            
        }
        
    }
}
Socket.init();