"use strict";module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'alunos',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    );
  },

  down() {},
};
