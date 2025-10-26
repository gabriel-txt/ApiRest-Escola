"use strict";/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: { // Nome original do arquivo enviado
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: { // Nome do arquivo salvo no servidor
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: { // Campo de chave estrangeira para aluno
        type: Sequelize.INTEGER,
        references: {
          model: 'alunos',
          key: 'id'
        },
        onDelete: 'CASCADE', // O que acontece quando o aluno é deletado
        onUpdate: 'CASCADE' // O que acontece quando o id do aluno é atualizado
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
