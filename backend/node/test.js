const Qihu = require('./bin/qihu');
var qihu = new Qihu();
qihu.search("吐槽大会").then((res)=>{
    console.log(res);
    //console.log(res[0]['playlist']);
});