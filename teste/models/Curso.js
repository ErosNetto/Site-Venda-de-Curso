import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Curso extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          NotEmpty: {
            msg: 'Campo descrição deve ser preenchido',
          },
        },
      },
      categoria: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          NotEmpty: {
            msg: 'O Campo categoria é obrigtorio!',
          },
        },
      },
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
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
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      // tableName: 'fotos',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
