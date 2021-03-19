const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/reactjs-project',
        SALT_ROUNDS: 1,
        SECRET: 'reactjs',
        AUTH_COOKIE: 'AUTH',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'production connection string',
        SALT_ROUNDS: 10,
        SECRET: 'reactjsisawesome',
        AUTH_COOKIE: 'AUTH',
    }
}

module.exports = config[process.env.NODE_ENV];