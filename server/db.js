const pg = require('pg');
let pool;
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: true
};

module.exports = {
    getPool: () => {
        if (pool) return pool
        pool = new pg.Pool(config)
        return pool
    }
}
