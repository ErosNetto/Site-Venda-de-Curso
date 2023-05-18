import Sequelize, { Model } from 'sequelize';
// import appConfig from '../config/appConfig';

export default class Curso extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      descricao: {
        type: Sequelize.TEXT,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 500],
            msg: 'Campo descrição não pode ser nulo.',
          },
        },
      },
      categoria: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Selecione uma categoria.',
          },
        },
      },
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo preço é obrigatório.',
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo User_id é obrigatório.',
          },
        },
      },
      // originalname: {
      //   type: Sequelize.STRING,
      //   defaultValue: '',
      //   validate: {
      //     notEmpty: {
      //       msg: 'Campo não pode ficar vazio.',
      //     },
      //   },
      // },
      // filename: {
      //   type: Sequelize.STRING,
      //   defaultValue: '',
      //   validate: {
      //     notEmpty: {
      //       msg: 'Campo não pode ficar vazio.',
      //     },
      //   },
      // },
      // url: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     return `${appConfig.url}/images/${this.getDataValue('filename')}`;
      //   },
      // },
    }, {
      sequelize,
      // tableName: 'cursos',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.FotoCurso, { foreignKey: 'curso_id' });
  }
}
