module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'mysql-yefersongallo.alwaysdata.net',
        user: process.env.DATABASE_USER || '229201',
        password: process.env.DATABASE_PASSWORD || 'Yefer990412',
        database: process.env.DATABASE_NAME || 'yefersongallo_db_link'
    },
    port: process.env.PORT || 4000
};