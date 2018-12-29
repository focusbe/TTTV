class Albums{
    constructor(){
        
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
    async getAlbumByThirdId(third_id){
        var result = await this.db.select('id').from('albums').where({third_id:third_id});
        if(!!result&&result.length>0){
            return result;
        }
        return false;
    }
}