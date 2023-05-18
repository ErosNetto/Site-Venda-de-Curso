import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', userController.index);
router.post('/', loginRequired, userController.store);
router.put('/:id', loginRequired, userController.update);
router.get('/:id', userController.show);
router.delete('/:id', loginRequired, userController.delete);

export default router;
