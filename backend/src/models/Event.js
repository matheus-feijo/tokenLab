const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            date_start: DataTypes.DATE,
            date_end: DataTypes.DATE,
            description: DataTypes.TEXT,
            userId: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
}

module.exports = Event;