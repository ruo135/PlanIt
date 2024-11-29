// Routes contains all the routes that we use
// to interact with the db

import express from "express";
import { createTag } from "../controllers/TagController";

const router = express.Router();

// Routes
router.post("/createTag", createTag);

export default router;
