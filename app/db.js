const conn = function(){
    return {
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    host: 'localhost',
    database: process.env.NAME_DB,
    port: 5432}
}

module.exports.conn = conn