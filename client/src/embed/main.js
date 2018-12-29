
var ipcRenderer = require('electron').ipcRenderer;

var TTTV = {
    DLNA:function(deviceid){
        var iframes = document.getElementsByTagName('iframe');
        this.findVideo(iframes,function(playlist){
            console.log(playlist);
            if(!playlist||playlist.length==0){
                alert('该视频暂不支持投屏播放，请尝试其他资源');
                return;
            }
            ipcRenderer.send('senddata',{tag:'backend',event:'dlanurl',data:{playlist:playlist,deviceid:deviceid}});
        });
    },
    findVideo:function(iframes, callback) {
        window.TTTV.getPlayListCallback = callback;
        var self = this;
        
        for(var i=0;i<iframes.length;i++){
            var curiframe = iframes[i];
            //console.log(curiframe.src);
            if(curiframe.src.indexOf('.m3u8')>-1){
                var m3u8 = TTTV.getQueryString(curiframe.src,'url');
                callback([{
                    name: '自动',
                    type: 'm3u8',
                    url: m3u8
                }]);
                break;
            }
            if(curiframe.contentWindow.document.readyState=='complete'){
                this.checkCurIframe(curiframe,callback);
            }
            curiframe.onload = function(){
                this.checkCurIframe(curiframe,callback);
            }
        }
    },
    checkCurIframe:function(iframe,callback){
        var iframeContents = iframe.contentWindow.document.getElementsByTagName('iframe');
        // console.log(iframe.contentWindow.WWW_URL);
        if(typeof(iframe.contentWindow.yunparse)!='undefined'||(typeof(iframe.contentWindow.rundao)!='undefined')||(typeof(iframe.contentWindow.WWW_URL)!='undefined')){
            var script = iframe.contentWindow.document.createElement("script");
            script.type = "text/javascript";
            script.src = LOCALPATH+"embed/videopage.js";
            iframe.contentWindow.document.head.appendChild(script);
        }
        else if(iframeContents.length>0){
            this.findVideo(iframeContents,callback);
        }
    },
    getQueryString:function (url,name) {
        var urlarr = url.split('?');
        if(urlarr.length>1){
            var search = urlarr[urlarr.length-1];
        }
        else{
            return null;
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = search.match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    }
}