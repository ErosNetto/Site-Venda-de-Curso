import Sequelize, { Model } from 'sequelize';

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
      carga_horaria: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Preencha a carga horária.',
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
      instrutor_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo instrutor_id é obrigatório.',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.FotoCurso, { foreignKey: 'curso_id' });
    this.hasMany(models.VideoCurso, { foreignKey: 'curso_id' });
    this.belongsTo(models.Instrutor, { foreignKey: 'instrutor_id' });
    this.hasMany(models.CarrinhoDeCompras, { foreignKey: 'curso_id' });
    this.hasMany(models.Favoritos, { foreignKey: 'curso_id' });
    this.hasMany(models.HistoricoDeCompras, { foreignKey: 'curso_id' });
  }
}
