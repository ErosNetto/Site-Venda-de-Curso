import { Router } from "express";
import instrutorController from "../controllers/InstrutorController";

import loginRequired from "../middlewares/loginRequired";
import instrutorRequired from "../middlewares/instrutorRequired";

const router = new Router();

router.get("/", loginRequired, instrutorRequired, instrutorController.index);
router.post("/", loginRequired, instrutorRequired, instrutorController.store);
router.get("/:id", loginRequired, instrutorController.show);
router.put(
  "/:id",
  loginRequired,
  instrutorRequired,
  instrutorController.update
);
// router.delete('/', loginRequired, instrutorController.delete);

export default router;
