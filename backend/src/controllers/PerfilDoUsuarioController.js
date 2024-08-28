import PerfilDoUsuario from '../models/PerfilDoUsuario';

class PerfilDoUsuarioController {
  async index(req, res) {
    const perfil = await PerfilDoUsuario.findAll({
      attributes: ['id', 'user_id', 'curso_id', 'progresso'],
      order: [['id', 'DESC']],
    });
    res.json(perfil);
  }

  async store(req, res) {
    try {
      const novoPerfil = await PerfilDoUsuario.create(req.body);

      // const { id, curso_id, user_id, progresso } = novoPerfil;
      // return res.json({ id, curso_id, user_id, progresso });

      return res.json(novoPerfil);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new PerfilDoUsuarioController();
