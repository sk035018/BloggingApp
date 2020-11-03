const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    return sequelize.define("blogs", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        
        author : {
            allowNull: false,
            type : DataTypes.INTEGER,
        },

        content : {
            allowNull : false,
            type : DataTypes.STRING(500),
        },

        description : {
            type : DataTypes.STRING(100),
        }

    }, { timestamps: false });
};