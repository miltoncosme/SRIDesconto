const conn = function(){
    return {
    user: 'postgres',
    password: '740516',
    host: 'localhost',
    database: `sridesconto`,    
    port: 5432}
}

module.exports.conn = conn