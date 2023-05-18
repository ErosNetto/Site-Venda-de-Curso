import { Router } from 'express';
import cursoController from '../controllers/CursoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, cursoController.index);
router.post('/', loginRequired, cursoController.store);
router.put('/:id', loginRequired, cursoController.update);
router.get('/:id', loginRequired, cursoController.show);
router.delete('/:id', loginRequired, cursoController.delete);

export default router;
