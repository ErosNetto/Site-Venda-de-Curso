import multer from 'multer';
import multerConfigFotos from '../config/multerConfigFotos';

import FotoInstrutor from '../models/FotoInstrutor';

const upload = multer(multerConfigFotos).single('foto');

class FotoInstrutorController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { instrutor_id } = req.body;
        const foto = await FotoInstrutor.create({ originalname, filename, instrutor_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Esse instrutor não existe'],
        });
      }
    });
  }
}

export default new FotoInstrutorController();
