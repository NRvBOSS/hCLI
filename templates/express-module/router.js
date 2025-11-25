import { Router } from "express";
import { __NAME__Controller } from "./__NAME__.controller.js";

const router = Router();

router.get("/", __NAME__Controller);

export default router;
