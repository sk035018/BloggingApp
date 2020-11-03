require('dotenv').config();

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect : 'postgres',
    host : process.env.HOST,
    port : process.env.DB_PORT,
    username : process.env.USER_NAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    sync : true,
});

const users = require('./models/users')(sequelize);
const blogs = require('./models/blogs')(sequelize);

const Init = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
      } catch (error) {
        console.log(error);
      }
};

module.exports = {
    Init,
    users,
    blogs,
}