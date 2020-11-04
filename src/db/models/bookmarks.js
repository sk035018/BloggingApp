const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    return sequelize.define("bookmarks", {
       
        user_id : {
            allowNull: false,
            type : DataTypes.INTEGER,
        },

        blog_id : {
            allowNull : false,
            type : DataTypes.INTEGER,
        },

    }, { timestamps: false });
};