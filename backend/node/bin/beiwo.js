var cheerio = require("cheerio");
const utli = require("../lib/utli");
class Beiwo{
    constructor(){
        
    }
    async _getDetail(url,videoInfo){
        var html = await utli._request({host:'www.beiwo.tv',path:url,protocol:"http:"},"GET");
        var $ = cheerio.load(html);
        var downlists = $(".downlist");
        let downloadArr = [];
        videoInfo['desc'] = $(".endtext").html();
        downlists.each(function(index,item){
            let downloadhtml = $(item).find('ul>script').html();
            downloadhtml = downloadhtml.split(';');
            if(!!downloadhtml[0]){
                downloadhtml = downloadhtml[0];
                downloadhtml = downloadhtml.replaceAll(' ','');
                
                downloadhtml = downloadhtml.replaceAll('varGvodUrls3="','');
                downloadhtml = downloadhtml.replaceAll('"','');
                let temdownList = downloadhtml.split('$###');
                let temdownload = [];
                for(var i in temdownList){
                    if(!!temdownList[i]){
                        let temarr = temdownList[i].split('$');
                        if(!!temarr[0]&&!!temarr[1]){
                            temdownload.push({'title':temarr[0],'url':temarr[1]});
                        }
                    }
                }
                if(!!temdownload[0]){
                    downloadArr.push({source:index+1,list:temdownload});
                }
            }
            
        });
        return downloadArr;
    }
    async search(keyword){
        var self = this;
        try {
            var html = await utli._request({host:"www.beiwo.tv",path:"/index.php",protocol:"http:"}, "GET", { wd: keyword ,s:"vod-search"});
        } catch (error) {
            console.log(error);
        }
        
        var $ = cheerio.load(html);
        var movielist= $(".movielist>ul>li");
        var albums =  await utli.asynceach(movielist,async function(index,item){
            let album = {};
            album['detailurl'] = $(item).find(".play-img").attr('href');
            album['img'] = $(item).find(".play-img>img").attr('src');
            album['title'] = $(item).find(".play-img").attr('title');
            album['source'] = 'beiwo';
            album['total'] = $(item).find(".play-img em").html();
            album["playlist"] = [];
            album["playlist"] = await self._getDetail(album['detailurl'],album);
            return album;
        });
        return albums;
        
    }
}
module.exports = Beiwo;