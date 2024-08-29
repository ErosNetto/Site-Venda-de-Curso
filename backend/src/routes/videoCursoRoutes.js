import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";
import instrutorRequired from "../middlewares/instrutorRequired";

import VideoCursoController from "../controllers/VideoCursoController";

const router = new Router();

router.post("/", loginRequired, instrutorRequired, VideoCursoController.store);

export default router;
