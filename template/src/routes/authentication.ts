import { Router } from "express";

// Others
import Controller from "../controllers/authentication/handlers";

const router = Router();

/**
 * Authentication routes
 */
router.post("/signin", Controller.signin);
router.post("/signup", Controller.signup);

export default router;
