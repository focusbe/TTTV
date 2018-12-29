var Database = require('../lib/database');
class Keyword{
    constructor(){
        
    }
    async getlist(){
        if(!this.db){
            this.db = await Database.init();
        }
        var result = await this.db.select().from('search').where({state:0});
        return result;
    }
    async searched(id){
        if(!id){
            return false;
        }
        if(!this.db){
            this.db = await Database.init();
        }
        var data = {state:1};
        data['updatetime'] = utli.getCurTime();
        var result = await this.db('albums').where('id',id).update(data);
        return result;
    }
}
module.exports = Keyword;