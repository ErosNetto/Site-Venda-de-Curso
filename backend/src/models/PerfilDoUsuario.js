import Sequelize, { Model } from 'sequelize';

export default class PerfilDoUsuario extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'user_id obrigatório!',
          },
        },
      },
      curso_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'curso_id obrigatório!',
          },
        },
      },
      progresso: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isWithinRange(value) {
            if (value < 0 || value > 100) {
              throw new Error('Progresso deve estar entre 0 e 100');
            }
          },
        },
      },
    }, {
      sequelize,
      tableName: 'perfilDoUsuario',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Curso, { foreignKey: 'curso_id' });
  }
}
