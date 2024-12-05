const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./connection");

const List = sequelize.define("list", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: "#000000",
    },
});

const Item = sequelize.define("item", {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

List.hasMany(Item, { foreignKey: 'list_id', onDelete: 'CASCADE' });
Item.belongsTo(List, { foreignKey: "list_id" });

module.exports = { List, Item, sequelize };
