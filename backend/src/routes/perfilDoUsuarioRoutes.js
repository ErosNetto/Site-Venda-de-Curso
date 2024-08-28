import { Router } from 'express';
import PerfilDoUsuarioController from '../controllers/PerfilDoUsuarioController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, PerfilDoUsuarioController.index);
router.post('/', loginRequired, PerfilDoUsuarioController.store);

export default router;
