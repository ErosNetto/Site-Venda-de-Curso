import Curso from '../models/Curso';
import FotoCurso from '../models/FotoCurso';
import VideoCurso from '../models/VideoCurso';
import Instrutor from '../models/Instrutor';

class CursoController {
  async index(req, res) {
    const cursos = await Curso.findAll({
      attributes: ['id', 'nome'],
      order: [['id', 'DESC'], [Instrutor, 'id', 'DESC'], [FotoCurso, 'id', 'DESC'], [VideoCurso, 'id', 'DESC']],
      include: [
        {
          model: Instrutor,
          attributes: ['id', 'nome'],
        },
        {
          model: FotoCurso,
          attributes: ['url', 'filename'],
        },
        {
          model: VideoCurso,
          attributes: ['url', 'filename'],
        },
      ],
    });
    res.json(cursos);
  }
}
export default new CursoController();
