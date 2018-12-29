<template>
<div class="page_wrap play_page">
	<div class="topbar">
        <div class="drag">
            
        </div>
        <div class="button_wrap options_wrap">
            <mu-icon v-on:click="goToOri" title="源网站" value="video_library" :size="24"/>
            <div class="airplay_wrap inline_b">
                <mu-icon v-on:click="showList" title="投屏电视" value="airplay" :size="24"/>
                <ul class="airplaylist">
                    <li v-on:click="dlna" v-for="(device, index) in dlnalist"  v-bind:title="device.name" ><span v-bind:class="(index==dlnaStatus['index']&&dlnaStatus['status'])==1?'cur':''">{{device.name}}</span><mu-circular-progress :size="20" v-if="index==dlnaStatus['index']&&dlnaStatus['status']==0" class="deviceloading"/></li>
                </ul>
            </div>
            <mu-icon class="close" v-on:click="close" :size="24" value="close"/>
        </div>

    </div>
    <div class="loading">
        <mu-circular-progress :size="40"/>
    </div>
    <webview style="height:100%;" id="video" src="about:blank" nodeintegration autosize disablewebsecurity plugins width="100%" height="100%" ></webview>
    
</div>
</template>
<style>
    #video{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .airplay_wrap{
        position: relative;
        
    }
    
    .airplay_wrap ul{
        position: absolute;
        top: 30px;
        right: 0;
        line-height: 30px;
        display: none;
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: #fff;
        border: 1px solid #ccc;
        text-align: left;
        color: #000;
        padding: 5px 10px;
        border-radius: 5px;
    }
    .airplay_wrap ul li{
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
    }
    .airplay_wrap ul li .cur{
        color:aqua;
    }
    /* .airplay_wrap:hover ul{
        display: block;
    } */
    .deviceloading{
        position: absolute;
        right: 0px;
        top: 5px;
        z-index: 300;
    }
    .options_wrap{
        position: absolute;
        width: 120px;
        z-index: 100;
        right:10px;
        top: 10px;
        height: 24px;
        line-height: 24px;
        text-align: right
    }
    .options_wrap>*{
        margin: 0 5px;
    }
</style>

<script>
window.WINDOWTAG = 'playVideo';
import $ from 'jquery';
const apiurl = 'http://api.baiyug.cn/vip/?url=';
export default {
	name: 'video_play',
	data() {
		return {
            dlnalist:[],
            dlnaStatus:{index:-1,status:0}
		}
	},
	mounted: function() {
        this.url = this.getQueryString('url');
        
        var self = this;
        $(function(){
            self.setVideo();
            Socket.getData('getdlnaList()',function(data){
                console.log(data);
                self.dlnalist = data;
            });
        });
        //self.dlnalist = [{name:'小米盒子mini'},{name:'天猫盒子xxxxx'},{name:'海信电视'}];
        Socket.on('dlnalist',function(data){
            self.dlnalist = data;
            console.log(data);
        });
        
        Socket.on('dlnastatus',function(data){
            self.dlnaStatus['status'] = data['status'];
        });
        
        this.dlnaStatus = {'index':-1,status:0};
        $(".airplay_wrap").hover(function(){
            if($(".airplay_wrap ul").css('display')!='none'){
                $(".airplay_wrap ul").stop().fadeIn(100);
            }
        },function(){
            $(".airplay_wrap ul").stop().fadeOut();
        });
        //window.open('http://www.baidu.com');
	},
	methods: {
        getQueryString:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) return unescape(r[2]); return null; 
        },
        setVideo:function(){
            var videoel = document.getElementById('video');
            //videoel.style.visibility = 'hidden';
            var pathname = window.location.pathname;
            var pathnamearr = pathname.split('/');
            delete pathnamearr[pathnamearr.length-1];  
            pathname = pathnamearr.join("/");  
            var jsurl = window.location.protocol+'//'+ pathname+'embed/main.js';
            videoel.addEventListener('did-finish-load', (e) => {
                $(".loading").hide();
                videoel.style.visibility = 'visible';
                if(DEBUG){
                    videoel.openDevTools();
                }
                
                videoel.executeJavaScript(
                    "var LOCALPATH='"+window.location.protocol+'//'+ pathname+"'; var body=document.getElementsByTagName('body')[0]; console.log(body);var scriptE = document.createElement('script');scriptE.src='" +
                    jsurl +
                    "';body.appendChild(scriptE);",
                    false,
                    function (err) {
                        console.log(err);
                    }
                );
            });
            videoel.addEventListener('media-started-playing', (e) => {
                //alert('媒体播放');
            });
            videoel.addEventListener('did-fail-load', (e) => {
                $(".loading").hide();
                alert('加载失败请重试');
                window.close();
                //videoel.style.visibility = 'visible';
                //videoel.openDevTools();
            });
            
            videoel.src=apiurl+this.url;
            
        },
        goToOri:function(){
            if(!this.url){
                alert('视频地址为空');
                return;
            }

            var videoel = document.getElementById('video');
            if(videoel.src.indexOf(apiurl)>-1){
                videoel.src=this.url;
            }
            else{
                videoel.src=apiurl+this.url;
            }
            
        },
        getPlayurAndDlna:function(deviceid){
            //Socket.sendTo('backend','dlna',this.url);
            var videoel = document.getElementById('video');
            this.dlnaStatus = {'index':deviceid,status:0};
            videoel.executeJavaScript('TTTV.DLNA('+deviceid+')',false,function(err){
                console.log(err);
            });
        },
        showList:function(){
            
            // this.getPlayUrl(function(playurls){
            //     console.log(playurls);
            // });
            if($(".airplaylist li").length>0){
                
                $(".airplaylist").stop().fadeIn();
            }
            else{
                alert('未找到可播放设备');
            }
        },
        dlna:function(e){
            if(!!e&&!!e.target){
                //alert($(e.target).is('li'));
                var index;
                if($(e.target).is('li')){
                    index = $(e.target).index();
                }
                else{
                    index = $(e.target).parent().index();
                }
                
                this.getPlayurAndDlna(index);
            }
            else{
                //alert('shibai');
            }
      
        },
        close:function(){
            window.close();
        }
	}
}
</script>
