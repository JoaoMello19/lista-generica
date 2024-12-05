const { Sequelize } = require("sequelize");

const HOST = "localhost";
const USER = "joaomello";
const PASSWORD = "senha123";
const DB_NAME = "lists_db";

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;
