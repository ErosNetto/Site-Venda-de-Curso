import { Router } from "express";
import meusCursoController from "../controllers/MeusCursoController";

import loginRequired from "../middlewares/loginRequired";
import instrutorRequired from "../middlewares/instrutorRequired";

const router = new Router();

router.get("/", loginRequired, instrutorRequired, meusCursoController.index);

export default router;
