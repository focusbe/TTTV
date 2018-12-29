var TTDownload = require('./index.js');
var ttdownload = new TTDownload({});
// var Aria2 = require('./aria2.js');
// var aria2 =  new Aria2({
//     dir:'C:/Download/'
// });


// async function aria2test(){
//     // var res1 = await aria2.init();
//     // console.log('arai init '+ res1);
//     // if(res1){
//     //     console.log('arai success');
//     //     var res2 = await aria2.addTask('http://222.73.62.246/elsclient/fullclient/elswordcnclient80404.rar');
//     //     console.log(res2);
//     //     // if(res){
//     //     //     res.then((gid)=>{
//     //     //         console.log(gid);
//     //     //     })
//     //     // }
//     // }
// }
// aria2test();


async function main() {
    try {
        var res = await ttdownload.init();
        if (res) {
            ttdownload.on('progress',function(task){
                console.log('progress');
                console.log(task);
            })
            ttdownload.on('start',function(task){
                console.log('start');
                console.log(task);
            })
        }
    } catch (error) {
        console.log(error);
    }
}
main();