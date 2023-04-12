import { Router } from "express";
import { addBookingController, getBookingsController } from "@controllers/bookings";
import verifyAuth from "@middlewares/verifyAuth";

const router = Router();

// desc Get all bookings for a user
// @route /bookings
router.get("/", verifyAuth, getBookingsController);

// @desc Add a booking
// @route /bookings/add
router.post("/add", verifyAuth, addBookingController);
export default router;
