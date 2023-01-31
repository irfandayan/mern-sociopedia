import express from "express";
import { login } from "../controllers/auth.js";

// setup router
const router = express.Router();

router.post("/login", login);

export default router;
