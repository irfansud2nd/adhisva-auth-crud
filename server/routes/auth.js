import express from "express";
import "dotenv/config";
import { login, logout, register } from "../controller/auth.js";
import handleRefreshToken from "../controller/refreshToken.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

router.get("/refresh", handleRefreshToken);

export default router;
