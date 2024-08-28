import { Router } from 'express';
import fotoController from '../controllers/FotoController';

import loginRequired from '../middlewares/loginRequired';
import instrutorRequired from '../middlewares/instrutorRequired';

const router = new Router();

router.post('/', loginRequired, instrutorRequired, fotoController.store);

export default router;
