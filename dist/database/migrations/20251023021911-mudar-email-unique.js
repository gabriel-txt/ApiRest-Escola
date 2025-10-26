"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'alunos',
      'email',
      {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      }
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
