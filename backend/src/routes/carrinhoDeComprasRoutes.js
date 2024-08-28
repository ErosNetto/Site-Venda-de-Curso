import { Router } from 'express';
import carrinhoDeComprasController from '../controllers/CarrinhoDeComprasController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, carrinhoDeComprasController.index);
router.post('/', loginRequired, carrinhoDeComprasController.store);
router.delete('/:id', loginRequired, carrinhoDeComprasController.delete);

export default router;
