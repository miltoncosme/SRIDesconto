const conn = function(){
    return {
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        host: 'localhost',
        database: process.env.NAME_DB,
        port: 5432,
        ssl: false,
        max: 25, 
        idleTimeoutMillis: 3000, 
        connectionTimeoutMillis: 3000, 
        maxUses: 7500,
    }
}

module.exports.conn = conn