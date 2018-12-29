<template id="">
    <div id="app">
        <p>xxx</p>
        <router-view class="view"></router-view>
    </div>
</template>
<script>
    export default {
      name: 'app',
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          fileList:''
        }
      }
    }
</script>
