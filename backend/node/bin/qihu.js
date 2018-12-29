var cheerio = require("cheerio");
const utli = require("../lib/utli");

class Qihu {
    constructor() {
        this.InfoIndex = {
            desc: "描述",
            acts: "演员",
            directors: "导演",
            year: "年代",
            area: "地区",
            categories: "类型",
            isover: "剧集",
            emcee:"主持"
        };
    }
    _getInfoIndex(title) {
        for (var i in this.InfoIndex) {
            if (title.indexOf(this.InfoIndex[i]) > -1) {
                return i;
            }
        }
        return false;
    }
    
    async _getjujilist(jujilist,year,source){
        var videos = {};
        videos['list'] = [];
        await utli.asynceach(jujilist,function(index,item){
            item = cheerio(item)
            //console.log(cheerio(item) .html());
            var title = item.find('.title').text();
            var playurl = item.attr('href');
            if(playurl){
                playurl = utli.getClearUrl(playurl);
            }
            var date = item.find(".w-newfigure-hint").text();
            var poster = item.find(".js-playicon>img").attr('src');
            if(date){
                date = utli.getDate(date,'-');
            }
            if(playurl&&title){
                var video = {title:title,url:playurl,source:source,publishtime:date,poster:poster}
                videos['list'].push(video);
                videos['year'] = year;
                videos['source'] = source;
            }
            // console.log($(item).find('.title').text());
            // console.log($(item).attr('href'));
            // console.log(title+':'+date);
        });
        return videos;
    }
    async _getPlayListByDetail(idstr){
        var self = this;
        var para = idstr.split("_");
        if(para.length!=4){
            return false;
        }
        //console.log('https://www.360kan.com/va/'+para[2]+'.html');
        var detailhtml = await utli._request({
            host:'www.360kan.com',
            path:'/va/'+para[2]+'.html'
        },'GET',{});
        if(detailhtml){
            var $ = cheerio.load(detailhtml);
            var yearlist = $("#js-year .js-year-list>li>a");
            var playlist = [];
            var jujilist;
            var videos;
            if(yearlist.length>0){
                await utli.asynceach(yearlist,async function(index,item){
                    var year = parseInt($(item).text());
                    
                    if(year){
                        var jujibyyear = await utli._request({host:'www.360kan.com',path:'/cover/zongyilist'},'get',{id:para[2],do:'switchyear','year':year,site:para[3]});
                        var juji = cheerio.load(JSON.parse(jujibyyear)['data']);
                        jujilist = juji('#js-year-all>ul>li>a');
                        videos = await self._getjujilist(jujilist,year,para[3]);
                    }
                    //console.log({id:para[2],do:'switchyear','year':parseInt($(item).html()),site:para[3]});
                });

            }
            else{
                //console.log($('#js-year-all>ul>li>a'));
                
                jujilist = $('#js-year-all>ul>li>a');
                videos = await self._getjujilist(jujilist,utli.getcurYear(),para[3]);
            }
            return videos;
            
        }
        //console.log(detailhtml);
    }
    async _getPlayList(idstr){
        if(!idstr){
            return false;
        }
        var para = idstr.split("_");
        // console.log(para);
        if(para[1]==2||para[1]==4){
            return this._getPlayListById(idstr);
        }
        else if(para[1]==3){
            return this._getPlayListByDetail(idstr);
        }
    }
    async _getPlayListById(idstr) {
        var self = this;
        var para = idstr.split("_");
        //var url = 'https://so.360kan.com/episodes';
        var parajson = {
            ent_id: para[2],
            cat_id: para[1],
            site: para[3]
        };
        var post_data = {
            s: "[" + JSON.stringify(parajson) + "]"
        };
        var result = await utli._request("/episodes", "POST", post_data);
        if (!!result) {
            result = JSON.parse(result);
            if (!!result && result[0] && !!result[0].seriesHTML) {
                var playurl = [];
                var $ = cheerio.load(result[0].seriesHTML);
                var textarea = $("textarea").html();
                var links;
                if(!textarea){

                    links = $(".js-series-item a");
                }
                else{
                    textarea = utli.HTMLDecode(textarea);
                    $ = cheerio.load(textarea);
                    links = $('a');
                }
                links.each(function() {
                    playurl.push({
                        title: $(this).html(),
                        url: $(this).attr("href")
                    });
                });
                var result = {};
                result['list'] = playurl;
                result['source'] = para[3];

                return result;
            } else {
                return false;
            }
        }
        return false;
    }

    async search(keyword) {
        var self = this;
        var html = await utli._request("/index.php", "GET", { kw: keyword });
        var $ = cheerio.load(html);
        var long_item = $("#js-longvideo>.js-longitem,#js-longvideo>.js-dianshi");
        var albums = [];
        
        albums = await utli.asynceach(long_item, async function(index, item) {
            var album = {};
            var img = $(item)
                .find(".m-mainpic img")
                .attr("src");
            var contentWrap = $(item).children(".cont");
            
            album["detailurl"] = $(item)
                .find(".m-mainpic>a")
                .attr("href");
            

            var tabitems = $(item).find(
                ".playsiteWrap a"
            );
            console.log(tabitems.length);
            album["playlist"] = [];
            if( $(item).find(
                ".b-series-item").length>0){
            	console.log('是剧集');
                await utli.asynceach(tabitems, async function(
                    index,
                    item
                ) {
                    
                    var playlist = await self._getPlayList($(item).data("tab"));
                    if(playlist){
                        album['playlist'].push(playlist);
                    }
                    return playlist;
                });
            }
            else{
            	console.log('不是剧集');
                //tabitems = $(item).find(".index-dianying-playsite a,.dropdown>.dropmenu>a,.playsiteWra>.b-playsite>a");
                await utli.asynceach(tabitems, async function(
                    index,
                    item
                ) {
                    
                    var playurl = $(item).data('url');
                    console.log(playurl);
                    var title = $(item).attr('data-daochu').replace('to=','');
                    var playerlist = {};
                    playerlist['list'] = [{title:'1',url:playurl}];
                    playerlist['source'] = title; 
                    if(playurl){
                        album['playlist'].push(playerlist);
                    }
                    return playurl;
                });
            }
            
            album["title"] = contentWrap.find(".title>a").text();
            album["img"] = img;
            album["playtype"] = contentWrap.find(".title>.playtype").text();
            if (!!album["playtype"]) {
                album["playtype"] = album["playtype"]
                    .replace("[", "")
                    .replace("]", "");
            }
            var info_ul = contentWrap.find("ul>li");
            info_ul.each(function() {
                var curtitle = $(this)
                    .children("b")
                    .text();
                if (!!curtitle) {
                    curtitle = curtitle.trim().replace("：", "");
                }
                var curIndex = self._getInfoIndex(curtitle);
                if (curIndex) {
                    $(this)
                        .children("b")
                        .remove();
                    var infodetail = $(this).children("*");
                    var infoarr = [];
                    infodetail.each(function() {
                        infoarr.push($(this).text());
                    });
                    album[curIndex] = infoarr;
                }
            });
            album["desc"] = contentWrap
                .find(".m-description>p")
                .text().replace('简','');
            return album;
        });
        return albums;
    }
}
module.exports = Qihu;
