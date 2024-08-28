import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Campo nome deve ter entre 3 e 255 caracteres",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já exitste",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        istrutor: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "A senha precisa ter entre 6 e 50 caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.CarrinhoDeCompras, {
      foreignKey: "user_id",
      as: "carrinhos",
    });
    this.hasMany(models.Favoritos, { foreignKey: "user_id", as: "favoritos" });
    this.hasMany(models.HistoricoDeCompras, {
      foreignKey: "user_id",
      as: "historicoDeCompras",
    });

    // TESTE
    // this.hasOne(models.Instrutor, { foreignKey: 'usuario_id' });

    // eslint-disable-next-line
    // this.belongsToMany(models.Instrutor, { through: 'UserInstrutor', foreignKey: 'user_id', as: 'instrutores' });
  }
}
