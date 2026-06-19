import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  generatePlan,
  getNutritionPlan,
  updateNutritionPlan
} from "../controllers/nutritionController.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  generatePlan
);

router.get(
  "/",
  authMiddleware,
  getNutritionPlan
);

router.put(
  "/:id",
  authMiddleware,
  updateNutritionPlan
);

export default router;