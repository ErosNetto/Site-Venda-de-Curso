import Curso from '../models/Curso';
import FotoCurso from '../models/FotoCurso';

class HomeController {
  async index(req, res) {
    const cursos = await Curso.findAll({
      attributes: ['id'],
      order: [['id', 'DESC'], [FotoCurso, 'id', 'DESC']],
      include: {
        model: FotoCurso,
        attributes: ['url', 'filename'],
      },
    });
    res.json(cursos);
  }
}
export default new HomeController();
