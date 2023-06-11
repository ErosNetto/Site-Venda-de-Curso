import HistoricoDeCompras from '../models/HistoricoDeCompras';

class HistoricoDeComprasController {
  async index(req, res) {
    const historico = await HistoricoDeCompras.findAll({
      attributes: ['id', 'curso_id', 'user_id', 'dataDeCompra', 'formaDePagamento'],
      order: [['id', 'DESC']],
    });
    res.json(historico);
  }

  async store(req, res) {
    try {
      const novoHistorico = await HistoricoDeCompras.create(req.body);

      const {
        id, curso_id, user_id, dataDeCompra, formaDePagamento,
      } = novoHistorico;
      return res.json({
        id, curso_id, user_id, dataDeCompra, formaDePagamento,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new HistoricoDeComprasController();
