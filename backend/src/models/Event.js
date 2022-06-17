module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('events', {
        date: DataTypes.DATE,
        description: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
    })

    return Event;
}