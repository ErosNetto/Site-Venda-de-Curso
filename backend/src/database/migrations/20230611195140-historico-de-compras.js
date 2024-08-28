module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("historicoDeCompras", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cursos",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      dataDeCompra: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      formaDePagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        // Salva registro na base de dados
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        // Salva registro na base de dados
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable("historicoDeCompras"),
};
