import { Router } from "express";
import {register, login, logout, profile, verifyToken} from "../controllers/authController.js";
import {validateAuthToken} from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verify", verifyToken)
router.get("/profile", validateAuthToken, profile);
router.get("/logout", logout);

export default router;