const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            date: DataTypes.DATE,
            description: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = User;