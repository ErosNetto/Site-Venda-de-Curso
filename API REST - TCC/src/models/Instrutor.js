import Sequelize, { Model } from 'sequelize';

export default class Instrutor extends Model {
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
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      profissao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo profissão precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      biografia: {
        type: Sequelize.TEXT,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 500],
            msg: 'A biografia precisa ter no minimo 50 caracteres.',
          },
        },
      },
      idioma: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'O campo idioma é obrigatorio.',
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
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.FotoInstrutor, { foreignKey: 'instrutor_id' });
    this.hasMany(models.Curso, { foreignKey: 'instrutor_id' });
  }
}
