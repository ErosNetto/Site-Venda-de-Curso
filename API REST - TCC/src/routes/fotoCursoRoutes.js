import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import fotoController from '../controllers/FotoController';
import instrutorRequired from '../middlewares/instrutorRequired';

const router = new Router();

router.post('/', loginRequired, instrutorRequired, fotoController.store);

export default router;