import { addWorkerController, getAllWorkersController } from "@controllers/workers";
import verifyAuth from "@middlewares/verifyAuth";
import { Router } from "express";

const router = Router();

// @desc Get all workers/service providers
// /workers/all
router.get("/all", verifyAuth, getAllWorkersController);

// @desc Add a new worker to workers collection
// /workers/add
router.post("/add", verifyAuth, addWorkerController);

export default router;
