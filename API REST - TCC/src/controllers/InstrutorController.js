import Instrutor from '../models/Instrutor';

class InstrutorController {
  async store(req, res) {
    try {
      const novoInstrutor = await Instrutor.create(req.body);
      return res.status(400).json(novoInstrutor);
    } catch (e) {
      // return res.status(400).json({
      //   errors: e.errors.map((err) => err.message),
      // });
      console.log(e);
    }
  }

  // Index
  // async index(req, res) {
  //   try {
  //     const instrutores = await Instrutor.findAll({ attributes: ['id', 'nome', 'email'] });
  //     return res.json(instrutores);
  //   } catch (e) {
  //     return res.json(null);
  //   }
  // }

  // Show
  async show(req, res) {
    try {
      const instrutor = await Instrutor.findByPk(req.params.id);

      const {
        id, nome, sobrenome, profissao, biografia, idioma,
      } = instrutor;
      return res.json({
        id, nome, sobrenome, profissao, biografia, idioma,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const instrutor = await Instrutor.findByPk(req.instrutorId);

      if (!instrutor) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await instrutor.update(req.body);
      const {
        id, nome, sobrenome, profissao, biografia, idioma,
      } = novosDados;
      return res.json({
        id, nome, sobrenome, profissao, biografia, idioma,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  // async delete(req, res) {
  //   try {
  //     const instrutor = await Instrutor.findByPk(req.instrutorId);

  //     if (!instrutor) {
  //       return res.status(400).json({
  //         errors: ['Esse Instrutor não existe.'],
  //       });
  //     }

  //     await instrutor.destroy();
  //     return res.json(null);
  //   } catch (e) {
  //     return res.status(400).json({
  //       errors: e.errors.map((err) => err.message),
  //     });
  //   }
  // }
}

export default new InstrutorController();
