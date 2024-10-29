'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Khoa',
        email: 'example@gmail.com',
        hashed_pw: 'abcde',
        avatar: 'https:abcdef',
        description: 'seeder 01',
        role: 'admin'
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
