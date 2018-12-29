const knex = require('knex');
const log = require('./log');
const Database = {
    async init(){
        var self = this;
        if(!this.db){
            this.db = await knex({
                client: 'mysql',
                connection: {
                    host: '',
                    user: 'root',
                    password: '',
                    database:''
                }
            });
        }
        return this.db;
    },
    destroy(){
        this.db.destroy();
    }
}
module.exports = Database;