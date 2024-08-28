import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import fotoInstrutorController from '../controllers/FotoInstrutorController';
import instrutorRequired from '../middlewares/instrutorRequired';

const router = new Router();

router.post('/', loginRequired, instrutorRequired, fotoInstrutorController.store);

export default router;
