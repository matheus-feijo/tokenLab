const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            date_start: DataTypes.DATE,
            date_end: DataTypes.DATE,
            description: DataTypes.TEXT,
            user_id: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Event, { foreignKey: 'user_id', as: 'users', through: 'id' })
    }
}

module.exports = Event;