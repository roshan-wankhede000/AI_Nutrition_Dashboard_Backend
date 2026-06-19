import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/protected",
  authMiddleware,
  async (req, res) => {

    res.status(200).json({
      success: true,
      message: "Protected Route Accessed",
      user: req.user
    });

  }
);

export default router;