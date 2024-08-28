import Sequelize, { Model } from 'sequelize';

export default class HistoricoDeCompras extends Model {
  static init(sequelize) {
    super.init({
      curso_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'curso_id obrigatório!',
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'user_id obrigatório!',
          },
        },
      },
      dataDeCompra: {
        type: Sequelize.DATE,
        defaultValue: '',
        field: 'dataDeCompra',
        validate: {
          notEmpty: {
            msg: 'Data de compra obrigatório!',
          },
        },
      },
      formaDePagamento: {
        type: Sequelize.STRING,
        defaultValue: '',
        field: 'formaDePagamento',
        validate: {
          notEmpty: {
            msg: 'Forma de pagamento obrigatório!',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'historicoDeCompras',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Curso, { foreignKey: 'curso_id' });
  }
}
