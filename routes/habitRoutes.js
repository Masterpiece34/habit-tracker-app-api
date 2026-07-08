// Routes for habits
// Routes for habits

import express from "express";
import {
  getAllHabit,
  getHabitsById,
  createHabit,
  updateHabitById,
  removeById,
} from "../services/habitService.js";
const router = express.Router();

// GET /habit Get all habits

router.get("/habit", getAllHabit);

// GET /:id    Get a single habit by ID

router.get("/:id", getHabitsById);

// POST /habit Create a new habit

router.post("/", createHabit);

// PUT /:id Update an existing habit

router.put("/:id", updateHabitById);

// DELETE /:id  Delete a habit
router.delete("/:id", removeById);

export default router;
