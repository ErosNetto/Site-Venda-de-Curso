import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import VideoCursoController from '../controllers/VideoCursoController';

const router = new Router();

router.post('/', loginRequired, VideoCursoController.store);

export default router;
