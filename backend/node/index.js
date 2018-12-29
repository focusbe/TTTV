//const Database = require('./lib/database.js');
var process =  require('process');
var logger = require('./lib/log');
const Qihu = require('./bin/qihu');
const utli = require('./lib/utli');
const Keyword = require('./modules/keyword');
const self= Main = {
    init(){
        //self.database = Database.init();
        self.qihu = new Qihu();
        self.keyword = new Keyword();
        self.startfetch();
    },
    async startfetch(){
        while(true){

            await self.fetch();
            break;
        }
    },
    async fetch(){
        //self.keywordList =  await self.keyword.getlist();
        self.keywordList = [{keyword:'扶摇'}]
        if(self.keywordList.lenght==0){
            await utli.sleep(3000);
        }
        else{
            for(var i in self.keywordList){
                console.log(self.keywordList[i]['keyword']);
                var albums = await self.qihu.search(self.keywordList[i]['keyword']);
                console.log(albums);
                if(albums&&albums.lenght>0){
                    for(var i in albums){
                        //await self.database.save;
                    }
                }
                else{

                }
            }
        }

        // var albums = await qihu.search('奇葩大会');
        // if(albums){
        //     for(var i in albums){
                
        //     }
        // }
    }
}
Main.init();