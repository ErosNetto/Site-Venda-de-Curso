module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('carrinhoDeCompras', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      curso_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'curso',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
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

  down: (queryInterface) => queryInterface.dropTable('carrinhoDeCompras'),
};
