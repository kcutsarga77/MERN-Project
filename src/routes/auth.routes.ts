import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

// regiter
router.post("/register", register);

// login
router.post("/login", login);
export default router;