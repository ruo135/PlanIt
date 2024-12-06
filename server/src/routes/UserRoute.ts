// Routes contains all the routes that we use
// to interact with the db

import express from "express";
import * as UserController from "../controllers/UserController";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

// Routes
router.get("/", requireAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.registerUser);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
