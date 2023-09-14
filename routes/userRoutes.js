import express from "express";
import verifyToken from "../middlewares";
import userControllers from "../controllers/userControllers"

const user = verifyToken();
const userVerify = (req, res, next) => {
    if (user.role === "admin") next();
    else {
        return res.json({
            status: "Not authorized",
            status_code: 403
        })
    }
}

const router = express.Router()
router.get("/trains/availability", userVerify, userControllers.getTrainsAvailability)
router.post("/trains/:trainId/book", userVerify, userControllers.bookTrain)
router.get("/bookings/:bookingId", userVerify, userControllers.getBooking)

export default router;