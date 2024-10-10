module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'medicineDb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './medicine-db.sqlite'
        },
    },
    authentication:{
        jwtSecret: "test"
    }
}