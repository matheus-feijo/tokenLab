'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn('events', 'guest_user', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: true,
    })

  },

  async down(queryInterface, Sequelize) {

    queryInterface.removeColumn('events', 'guest_user', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: true,
    }
    )
  }
};
