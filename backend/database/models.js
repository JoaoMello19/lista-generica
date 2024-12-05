const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");

const List = sequelize.define(
    "list",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor padrão para createdAt
        },
    },
    {
        timestamps: false, // Desativa a criação automática das colunas `createdAt` e `updatedAt`
        tableName: "lists", // Especifica o nome da tabela
    }
);

const Item = sequelize.define(
    "item",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "lists", // Nome da tabela que está sendo referenciada
                key: "id",
            },
            onDelete: "CASCADE",
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor padrão para createdAt
        },
    },
    {
        timestamps: false, // Desativa a criação automática das colunas `createdAt` e `updatedAt`
        tableName: "items", // Especifica o nome da tabela
    }
);

List.hasMany(Item, { foreignKey: "listId", onDelete: "CASCADE" });
Item.belongsTo(List, { foreignKey: "listId" });

module.exports = { List, Item, sequelize };
