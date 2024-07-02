import express from "express";
import {register, login} from "../controllers/auth.js";
import checkAuth from "../controllers/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", checkAuth);

export default router;
