'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('events', [{
      date_start: '2022-06-25 00:00:01',
      date_end: '2022-06-25 23:59:59',
      description: 'Meu aniversario',
      user_id: 1

    },
    {
      date_start: '2022-11-09',
      date_end: '2022-11-14',
      description: 'Major no rio de janeiro',
      user_id: 1
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', [{
      date_start: '2022-06-25 00:00:01',
      date_end: '2022-06-25 23:59:59',
      description: 'Meu aniversario',
      user_id: 1

    },
    {
      date_start: '2022-11-09',
      date_end: '2022-11-14',
      description: 'Major no rio de janeiro',
      user_id: 1
    }
    ], {});

  }
};
