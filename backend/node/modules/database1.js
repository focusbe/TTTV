var knex = require('knex');
var logger = require('./log');
class Database{
    constructor(callback){
        var self = this;
        this.db = knex({
            client: 'mysql',
            connection: {
                host: 'focusbe.com',
                user: 'root',
                password: '1c019e9ecfca',
                database:'mytv'
            }
        });
    }
    destroy(){
        self.db.destroy();
    }
    
    async getSearchList(){
        logger.info('select search list');
        var result = await this.db.select().from('search').where({state:0});
        logger.info('select search result:'+JSON.stringify(result));
        return result;
    }
    async saveAlbum(data){
        logger.info('save albums :'+JSON.stringify(data));
        if(!data){
            return false;
        }
        if(!data.title||!data.desc||!data.img||!data.detailurl||!data.third_id){
            logger.info('save albums :'+JSON.stringify(data)+' data is not ready');
            return false;
        }
        var third_id = await this.getAlbumByThird(data.third_id);
        if(third_id){
            data.id = third_id[0].id;
        }
        if(!data.id){
            data['createtime'] = utli.getCurTime();
            logger.info('insert albums :'+JSON.stringify(data));
            var id = await this.db('albums').insert(data);
            logger.info('insert albums result:'+JSON.stringify(id));
            return id;
        }
        else{
            data['updatetime'] = utli.getCurTime();
            logger.info('update albums :'+JSON.stringify(data));
            var result = await this.db('albums').where({id:data.id}).update(data); 
            logger.info('insert albums result:'+JSON.stringify(result));
            return result;
        }
    }
    async saveVideos(data){
        if(!data.playurl||!data.title||!data.aid){
            return false;
        }
        var result = false;
        
        if(!data.id){
            data['createtime'] = utli.getCurTime();
            result = await this.db('videos').insert(data);
        }
        else{
            data['updatetime'] = utli.getCurTime();
            result = await this.db('videos').where({id:data.id}).update(data); 
        }
        return result;
    }

    async setSearched(id){
        if(!id){
            return false;
        }
        var data = {state:1};
        data['updatetime'] = utli.getCurTime();
        var result = await this.db('albums').where('id',id).update(data);
        return result;
    }
    async getLastVideo(third_id){
        
    }
    async getAlbumByThird(third_id){
        var result = await this.db.select('id').from('albums').where({third_id:third_id});
        if(!!result&&result.length>0){
            return result;
        }
        return false;
    }
}
module.exports = Database;