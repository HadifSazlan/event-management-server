import express from "express";
import { store, index, fetch, update, remove } from "../controllers/event.js";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/store", adminAuth, store);
router.get("/index", adminAuth, index);
router.get("/fetch/:_id", adminAuth, fetch);
router.put("/update/:_id", adminAuth, update);
router.delete("/remove/:_id", adminAuth, remove);

export default router;
