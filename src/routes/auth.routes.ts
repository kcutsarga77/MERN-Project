import express from "express";
import { changePassword, login, register } from "../controllers/auth.controller";

const router = express.Router();

// regiter
router.post("/register", register);

// login
router.post("/login", login);

// change password
router.put("/password", changePassword);

export default router;