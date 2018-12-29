const Beiwo = require('./bin/beiwo');
var beiwo = new Beiwo();
beiwo.search("妖猫传").then((res)=>{
    console.log(res);
});