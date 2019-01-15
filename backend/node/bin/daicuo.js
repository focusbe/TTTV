var cheerio = require("cheerio");
const utli = require("../lib/utli");
class Beiwo {
    constructor() {
        this.InfoIndex = {
            desc: "描述",
            acts: "主演",
            directors: "导演",
            year: "年份",
            area: "地区",
            categories: "子类",
            isover: "类型",
            emcee: "主持"
        };
    }
    async _getDetail(url, videoInfo) {
        var html = await utli._request({ host: 'v.daicuo.cc', path: url, protocol: "http:" }, "GET");
        var $ = cheerio.load(html);

        var downlists = $(".vod-item-playurl");
        let downloadArr = [];
        videoInfo['total'] = parseInt($(".vod-total").text());
        videoInfo['desc'] = $(".vod-content").text();
        videoInfo['img'] = $(".media-left img").attr('src');
        downlists.each(function (index, item) {
            let downloadhtml = $(item).find('ul>script').html();
            downloadhtml = downloadhtml.split(';');
            if (!!downloadhtml[0]) {
                downloadhtml = downloadhtml[0];
                downloadhtml = downloadhtml.replaceAll(' ', '');

                downloadhtml = downloadhtml.replaceAll('varGvodUrls3="', '');
                downloadhtml = downloadhtml.replaceAll('"', '');
                let temdownList = downloadhtml.split('$###');
                let temdownload = [];
                for (var i in temdownList) {
                    if (!!temdownList[i]) {
                        let temarr = temdownList[i].split('$');
                        if (!!temarr[0] && !!temarr[1]) {
                            temdownload.push({ 'title': temarr[0], 'url': temarr[1] });
                        }
                    }
                }
                if (!!temdownload[0]) {
                    downloadArr.push({ source: index + 1, list: temdownload });
                }
            }

        });
        return downloadArr;
    }
    async search(keyword) {
        var self = this;
        try {
            var html = await utli._request({ host: "v.daicuo.cc", path: "/index.php?s=vod-search", protocol: "http:" }, "POST", { wd: keyword});
            await console.log(html);
        } catch (error) {
            console.log(error);
        }
        return;
        var $ = cheerio.load(html);
        var movielist = $("table.table tr");
        var albums = await utli.asynceach(movielist, async function (index, item) {
            let album = {};
            album['detailurl'] = $(item).find("a").eq(0).attr('href');
            //album['img'] = $(item).find(".play-img>img").attr('src');
            album['title'] = $(item).find("a").eq(0).attr('title');
            album['source'] = 'daicuo';
            album['total'] = 0;
            album["playlist"] = await self._getDetail(album['detailurl'], album);
            return album;
        });
        return albums;

    }
}
module.exports = Beiwo;