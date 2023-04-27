import {
  addWorkerController,
  getAllWorkersController,
  getWorkersByServiceOfferedController,
} from "@controllers/workers";
import verifyAuth from "@middlewares/verifyAuth";
import { Router } from "express";

const router = Router();

// @desc Get all workers/service providers
// /workers/all
router.get("/all", verifyAuth, getAllWorkersController);

// @desc Get workers/service providers providing a specific service
// /workers/:serviceId
router.get("/:serviceId", verifyAuth, getWorkersByServiceOfferedController);

// @desc Add a new worker to workers collection
// /workers/add
router.post("/add", verifyAuth, addWorkerController);

export default router;
