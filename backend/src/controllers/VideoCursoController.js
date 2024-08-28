import multer from 'multer';
import multerConfigCurso from '../config/multerConfigCurso';

import VideoCurso from '../models/VideoCurso';

const upload = multer(multerConfigCurso).single('video');

class VideoCursoController {
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
        const video = await VideoCurso.create({ originalname, filename, curso_id });

        return res.json(video);
      } catch (e) {
        return res.status(400).json({
          errors: ['Curso não existe'],
        });
      }
    });
  }
}

export default new VideoCursoController();
