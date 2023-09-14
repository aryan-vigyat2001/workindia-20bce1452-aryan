import express from "express";
import authControllers from "../controllers/authControllers"
const router = express.Router()
router.post("/signup", authControllers.register)
router.post("/login", authControllers.loginUser)
export default router;