import { Router } from "express";
import cursoController from "../controllers/CursoController";

import loginRequired from "../middlewares/loginRequired";
import instrutorRequired from "../middlewares/instrutorRequired";

const router = new Router();

router.get("/", loginRequired, cursoController.index);
router.post("/", loginRequired, instrutorRequired, cursoController.store);
router.put("/:id", loginRequired, instrutorRequired, cursoController.update);
router.get("/:id", loginRequired, cursoController.show);
router.delete("/:id", loginRequired, instrutorRequired, cursoController.delete);

export default router;
