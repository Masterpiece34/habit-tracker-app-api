// This file acts as the traffic controller for all habit-related requests.
// It takes incoming HTTP requests, runs them through validation, and then hands them off to the service layer!

import express from "express";
import {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
} from "../services/habitService.js";
import {
  validateCreateHabit,
  validateUpdateHabit,
  validateCheckIn,
} from "../utils/validation.js";

const router = express.Router();
/**
•	GET /habit
•	Get all habits
*/
router.get("/habit", async (req, res) => {
  try {
    const habits = await getAllHabits();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch habits",
      error: error.message,
    });
  }
});
/**
•	GET /habit/:id
•	Get a single habit by ID
*/
router.get("/habit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const habit = await getHabitById(id);
    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch habit",
      error: error.message,
    });
  }
});
/**
•	POST /habit
•	Create a new habit
*/
router.post("/habit", validateCreateHabit, async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    const newHabit = await createHabit({ name, description, frequency });
    res.status(201).json({
      message: "Habit created successfully",
      data: newHabit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create habit",
      error: error.message,
    });
  }
});
/**
•	PUT /habit/:id
•	Update an existing habit
*/
router.put("/habit/:id", validateUpdateHabit, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, frequency } = req.body;
    const updatedHabit = await updateHabit(id, {
      name,
      description,
      frequency,
    });
    if (!updatedHabit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    res.status(200).json({
      message: "Habit updated successfully",
      data: updatedHabit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update habit",
      error: error.message,
    });
  }
});
/**
•	DELETE /habit/:id
•	Delete a habit
*/
router.delete("/habit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteHabit(id);
    if (!deleted) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    res.status(200).json({
      message: "Habit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete habit",
      error: error.message,
    });
  }
});

/**
 * POST /habit/:id/checkin
 * Check-in a habit for a specific date
 */
router.post("/habit/:id/checkin", validateCheckIn, async (req, res) => {
  try {
    const id = req.params.id;
    const { date } = req.body;
    
    // If no date is provided, default to today's date
    const checkInDate = date || new Date().toISOString().split('T')[0];
    
    const updatedHabit = await checkInHabit(id, checkInDate);
    
    if (!updatedHabit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    
    res.status(200).json({
      message: "Habit checked in successfully",
      data: updatedHabit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check-in habit",
      error: error.message,
    });
  }
});

export default router;
