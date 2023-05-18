import multer from 'multer';
import multerConfig from '../config/multerConfig';

import FotoCurso from '../models/FotoCurso';

const upload = multer(multerConfig).single('foto');

class FotoCursoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { curso_id } = req.body;
        const foto = await FotoCurso.create({ originalname, filename, curso_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }
    });
  }
}

export default new FotoCursoController();
