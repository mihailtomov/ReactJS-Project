const config = {
    development: {
        PORT: process.env.PORT || 5000,
        DB_CONNECTION: 'mongodb://localhost/reactjs-project',
        SALT_ROUNDS: 1,
        SECRET: 'reactjs',
        AUTH_COOKIE: 'AUTH',
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION: process.env.MONGODB_CONNECTION_STRING,
        SALT_ROUNDS: 10,
        SECRET: 'reactjsisawesome',
        AUTH_COOKIE: 'AUTH',
    }
}

module.exports = config[process.env.NODE_ENV];