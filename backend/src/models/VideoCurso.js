import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class VideoCurso extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio.',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/videos/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'videoCurso',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Curso, { foreignKey: 'curso_id' });
  }
}
