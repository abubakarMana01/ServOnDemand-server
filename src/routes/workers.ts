import { addWorkerController, getAllWorkersController } from "@controllers/workers";
import { Router } from "express";

const router = Router();

// @desc Get all workers/service providers
// /workers/all
router.get("/all", getAllWorkersController);

router.post("/add", addWorkerController);

export default router;
