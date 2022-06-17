'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      name: 'Matheus feijo',
      email: 'matheus@hotmail.com',
      password: '123456',
      created_at: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', [{
      name: 'Matheus feijo',
      email: 'matheus@hotmail.com',
      password: '123456',
      created_at: new Date(),
    }], {});

  }
};
