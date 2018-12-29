import Vue from 'vue';
import VueRouter from 'vue-router';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css';
import './css/themes.less';
import App from './pages/app.vue';
import './css/style.scss';
import 'material-design-icons';
window.DEBUG =window.location.href.indexOf('.asar')==-1;
Vue.use(MuseUI);
Vue.use(VueRouter);
function getPages(){
    var pages = require.context('./', true, /^\.\/pages\/(.*)\.vue$/);
    var pagerouter = [];
    var pageUrls = [];
    pages.keys().map(key => {
        let path = key.replace('./pages/', '').replace('.vue', '');
        let pathname = path.replace('/', '_');
        if(pathname.indexOf('public')==0||pathname.indexOf('app')==0){
            return;
        }
        pageUrls.push({
            name: pathname,
            path: path
        })
        pagerouter.push({
            name: pathname,
            path: path,
            ismenue:true,
            component: pages(key)
        })
        pagerouter.push({
            name: pathname+'_withparam',
            path: path + '/(.*)',
            ismenue:false,
            component: pages(key)
        })
    });
    return {pagerouter,pageUrls};
}

const Pages = getPages();
App.props = {
    pageUrls:{
        type: Array,
        default: function () {
            return Pages['pageUrls'];
        }
    }
};
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: { name: 'home' }},
        {
        path: '/',
        name: 'app',
        component: App,
        children: Pages['pagerouter']
    }]
})

new Vue({
  router,
  template: `
  <div id="app">
      <router-view class="view"></router-view>
  </div>
  `
}).$mount('#app');
