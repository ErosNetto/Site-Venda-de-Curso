import Instrutor from '../models/Instrutor';
import FotoInstrutor from '../models/FotoInstrutor';

class InstrutorController {
  async store(req, res) {
    try {
      const novoInstrutor = await Instrutor.create(req.body);
      return res.status(400).json(novoInstrutor);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
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
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const instrutor = await Instrutor.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'profissao', 'biografia', 'idioma'],
        order: [['id', 'DESC'], [FotoInstrutor, 'id', 'DESC']],
        include: {
          model: FotoInstrutor,
          attributes: ['url', 'filename'],
        },
      });

      if (!instrutor) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }

      // const { nome, email } = aluno;
      // return res.json({ nome, email });

      return res.json(instrutor);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const instrutor = await Instrutor.findByPk(req.params.id);

      if (!instrutor) {
        return res.status(400).json({
          errors: ['O intrutor não existe.'],
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
