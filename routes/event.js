import express from "express";
import { store, index, fetch, update, remove } from "../controllers/event.js";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", adminAuth, store);
router.get("/events", adminAuth, index);
router.get("/:_id", adminAuth, fetch);
router.put("/:_id", adminAuth, update);
router.delete("/:_id", adminAuth, remove);

export default router;
