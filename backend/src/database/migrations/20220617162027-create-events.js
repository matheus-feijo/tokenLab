'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_start: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      date_end: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
      }


    })

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('events');

  }
};
