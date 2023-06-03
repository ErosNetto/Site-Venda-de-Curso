import Sequelize, { Model } from 'sequelize';

export default class Favoritos extends Model {
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
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Curso, { foreignKey: 'curso_id' });
  }
}
