const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(

    process.env.DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,

    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected');
    } catch (error) {
        console.log(error)
    }
})()

module.exports = { sequelize };