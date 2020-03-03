const conn = function(){
    return {
    user: 'postgres',
    password: '740516',
    host: 'localhost',
    database: `SRIdesconto`,    
    port: 5432}
}

module.exports.conn = conn