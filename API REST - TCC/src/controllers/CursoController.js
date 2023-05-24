import Curso from '../models/Curso';
import FotoCurso from '../models/FotoCurso';
import VideoCurso from '../models/VideoCurso';
import Instrutor from '../models/Instrutor';

class CursoController {
  async index(req, res) {
    const cursos = await Curso.findAll({
      attributes: ['id', 'nome', 'descricao', 'categoria', 'preco', 'instrutor_id'],
      order: [['id', 'DESC'], [Instrutor, 'id', 'DESC'], [FotoCurso, 'id', 'DESC']],
      include: [
        {
          model: Instrutor,
          attributes: ['id', 'nome'],
        },
        {
          model: FotoCurso,
          attributes: ['url', 'filename'],
        },
      ],
    });
    res.json(cursos);
  }

  async store(req, res) {
    try {
      const curso = await Curso.create(req.body);

      // const { nome, email } = aluno;
      // return res.json({ nome, email });

      return res.json(curso);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const curso = await Curso.findByPk(id, {
        attributes: ['id', 'nome', 'descricao', 'categoria', 'preco'],
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

      if (!curso) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }

      // const { nome, email } = aluno;
      // return res.json({ nome, email });

      return res.json(curso);
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

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }

      await curso.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }

      const cursoAtualizado = await curso.update(req.body);

      // const { nome, email } = alunoAtualizado;
      // return res.json({ nome, email });

      return res.json(cursoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new CursoController();
