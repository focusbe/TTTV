<template>
<div class="page_wrap play_page">
	<div class="topbar">
        <div class="drag">
            
        </div>
        <div class="button_wrap">
            <mu-icon-button v-on:click="close" icon="close"/>
        </div>
    </div>
    <div>
        downloadpage
    </div>
</div>
</template>
<script>
import $ from 'jquery';
const TTdownload = require('bin/ttdownload/index');

export default {
	name: 'donwload_index',
	data() {
		return {
            ttdownload:null,
		}
	},
	mounted: function() {
        this.ttdownload = new TTdownload();
        try {
            var res = this.ttdownload.init().then((res)=>{
                if (res) {
                    self.ttdownload.on('progress',function(task){
                        console.log('progress');
                        console.log(task);
                    })
                    self.ttdownload.on('start',function(task){
                        console.log('start');
                        console.log(task);
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
	},
	methods: {
        close:function(){
            window.close();
        }
	}
}
</script>
