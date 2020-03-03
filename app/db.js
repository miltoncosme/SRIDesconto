const conn = function(){
    return {
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    host: 'localhost',
    database: `SRIdesconto`,
    port: 5432}
}

module.exports.conn = conn