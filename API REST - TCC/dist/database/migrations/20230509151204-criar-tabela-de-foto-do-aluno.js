"use strict";module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // false
        references: {
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'SET NULL', // 'CASCADE'
        onUpdate: 'CASCADE',
      },
      created_at: { // Salva registro na base de dados
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: { // Salva registro na base de dados
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable('fotos'),
};
