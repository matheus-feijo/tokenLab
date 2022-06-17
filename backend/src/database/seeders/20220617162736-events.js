'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('events', [{
      date: '2022-06-25',
      description: 'Meu aniversario',
      userId: 1

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', [{
      date: '2022-06-25',
      description: 'Meu aniversario',
      userId: 1

    }], {});

  }
};
