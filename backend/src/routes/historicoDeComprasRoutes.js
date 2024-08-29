import { Router } from "express";
import historicoDeComprasController from "../controllers/HistoricoDeComprasController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, historicoDeComprasController.index);
router.post("/", loginRequired, historicoDeComprasController.store);

export default router;
