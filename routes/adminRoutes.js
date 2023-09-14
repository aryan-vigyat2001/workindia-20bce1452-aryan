import express from "express";
import adminControllers from "../controllers/adminControllers";
import verifyToken from "../middlewares";

const user = verifyToken();
const router = express.Router()
router.post("/trains/create", (req, res, next) => {
    if (user.role === "admin") next();
    else {
        return res.json({
            status: "Not authorized",
            status_code: 403
        })
    }
}, adminControllers.addTrain)
export default router;