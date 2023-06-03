import CarrinhoDeCompras from '../models/CarrinhoDeCompras';

class CarrinhoDeComprasController {
  async index(req, res) {
    const carrinho = await CarrinhoDeCompras.findAll({
      attributes: ['id', 'curso_id', 'user_id'],
      order: [['id', 'DESC']],
    });
    res.json(carrinho);
  }

  async store(req, res) {
    try {
      const novoCarrinho = await CarrinhoDeCompras.create(req.body);

      const { id, curso_id, user_id } = novoCarrinho;
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

      const carrinho = await CarrinhoDeCompras.findByPk(id);

      if (!carrinho) {
        return res.status(400).json({
          errors: ['Esse carrinho_ID não existe'],
        });
      }

      await carrinho.destroy();
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
export default new CarrinhoDeComprasController();
