'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('events', 'created_at', {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('events', 'updated_at', {
      allowNull: false,
      type: Sequelize.DATE,
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('events', 'created_at', {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.removeColumn('events', 'updated_at', {
      allowNull: false,
      type: Sequelize.DATE,
    })

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
