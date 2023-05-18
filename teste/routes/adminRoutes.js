import { Router } from 'express';
import adminController from '../controllers/AdminController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveria existir
// router.get('/', adminController.index); // Lista usuários
// router.get('/:id', adminController.show); // Lista um usuário

router.post('/', loginRequired, adminController.store);
router.put('/', loginRequired, adminController.update);
router.delete('/', loginRequired, adminController.delete);

export default router;

/*
index  =>  lista todos os usuários  =>  GET
store/create  =>  cria um novo usuário  =>  POST
delete  =>  apaga um usuário  =>  DELETE
show  =>  mostra um usuário  =>  GET
update  =>  atualiza um usuário  =>  PATCH ou PUT
*/
