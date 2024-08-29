import { Router } from "express";
import favoritosController from "../controllers/FavoritosController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get("/", loginRequired, favoritosController.index);
router.post("/", loginRequired, favoritosController.store);
router.delete("/:id", loginRequired, favoritosController.delete);

export default router;
