import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import FotoInstrutorController from '../controllers/FotoInstrutorController';

const router = new Router();

router.post('/', loginRequired, FotoInstrutorController.store);

export default router;
