import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);
router.get("/", commentController.findAll);
router.get("/post/:id", commentController.findAllofPostId);

export default router;