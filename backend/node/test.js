// const Qihu = require('./bin/qihu');
// var qihu = new Qihu();
// qihu.search("吐槽大会").then((res)=>{
//     console.log(res);
//     for(var i in res[0]['playlist']){
//         console.log(i);
//     }
//     //console.log(res[0]['playlist']);
// });

// const Daicuo = require('./bin/daicuo');
// var daicuo = new Daicuo();
// daicuo.search("吐槽大会").then((res)=>{
//     console.log(res);
//     // for(var i in res[0]['playlist']){
//     //     console.log(i);
//     // }
//     //console.log(res[0]['playlist']);
// });
const Beiwo  = require('./bin/beiwo');
var beiwo = new Beiwo();
beiwo.search("完美关系").then((res)=>{
    console.log(res);
    // for(var i in res[0]['playlist']){
    //     console.log(i);
    // }
    //console.log(res[0]['playlist']);
});