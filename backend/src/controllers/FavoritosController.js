import Favoritos from '../models/Favoritos';

class FavoritosController {
  async index(req, res) {
    const favoritos = await Favoritos.findAll({
      attributes: ['id', 'curso_id', 'user_id'],
      order: [['id', 'DESC']],
    });
    res.json(favoritos);
  }

  async store(req, res) {
    try {
      const novoFavorito = await Favoritos.create(req.body);

      const { id, curso_id, user_id } = novoFavorito;
      return res.json({ id, curso_id, user_id });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const favorito = await Favoritos.findByPk(id);

      if (!favorito) {
        return res.status(400).json({
          errors: ['Esse favorito_ID não existe'],
        });
      }

      await favorito.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new FavoritosController();
