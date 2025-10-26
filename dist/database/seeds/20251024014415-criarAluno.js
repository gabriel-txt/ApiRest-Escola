"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
        await queryInterface.bulkInsert(
          'alunos',
          [
            {
              nome: 'Beltrano',
              sobrenome: 'Silva',
              email: 'beltrano@gmail.com',
              idade: 20,
              peso: 75.5,
              altura: 2,
              created_at: new Date(),
              updated_at: new Date()
            },
            {
              nome: 'Ciclano',
              sobrenome: 'Silva',
              email: 'ciclano@gmail.com',
              idade: 25,
              peso: 100,
              altura: 1.80,
              created_at: new Date(),
              updated_at: new Date()
            },
            {
              nome: 'Fulano',
              sobrenome: 'Silva',
              email: 'fulano@gmail.com',
              idade: 15,
              peso: 50,
              altura: 1.60,
              created_at: new Date(),
              updated_at: new Date()
            },
          ],
          {});
  },

  async down () {}
};
