import { Router } from "express";
import { addBookingController, getBookingsController, getUpcomingBookingsController } from "@controllers/bookings";
import verifyAuth from "@middlewares/verifyAuth";

const router = Router();

// desc Get all bookings for a user
// @route /bookings/all
router.get("/all", verifyAuth, getBookingsController);

// desc Get upcoming bookings for a user
// @route /bookings/upcoming
router.get("/upcoming", verifyAuth, getUpcomingBookingsController);

// @desc Add a booking
// @route /bookings/add
router.post("/add", verifyAuth, addBookingController);
export default router;
