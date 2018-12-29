<template id="template">
    <div class="layout" >
        <!-- <mu-appbar title="GWF" class="app_head">
            <mu-icon-button icon="menu" slot="left"/>
            
            <mu-icon-button icon="close" @click="exit" slot="right"/>
        </mu-appbar> -->
        <router-view class="view">
                    
        </router-view>
        
        <mu-popup position="top" popupClass="demo-popup-top" :open="newPopup" @close="closeNew()">
            <mu-appbar title="弹出">
            <mu-flat-button slot="right" label="关闭" color="white" @click="closeNew()"/>
            </mu-appbar>
            <mu-content-block>
            <p>
                Popup 弹出框组件，可以从上下左右四个方位弹出，也可以直接渐变透明度显示，弹出框的宽度高度需要自己设置
            </p>
            <p>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </p>
            </mu-content-block>
        </mu-popup>
    </div>
</template>
<script>
import "../js/common.js";
import $ from "jquery";
export default {
  data: function() {
    return {
      active: "home",
      newPopup: false
    };
  },
  updated: function() {},
  mounted: function() {
    var self = this;
    Socket.on("new_project", function() {
      self.showNewProject();
    });
    Socket.on("message", function(data) {
      // alert(data);
      // console.log(data);
    });
    $("body").addClass(process.platform);
  },
  methods: {
    exit: function() {
      window.close();
    },
    showNewProject: function() {
      this.newPopup = true;
    },
    closeNew: function() {
      this.newPopup = false;
    }
  }
};
</script>
