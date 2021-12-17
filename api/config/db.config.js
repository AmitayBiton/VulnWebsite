module.exports = {
    HOST: "localhost",
    USER: "******",
    PASSWORD: "********",
    DB: "vulnsite",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
