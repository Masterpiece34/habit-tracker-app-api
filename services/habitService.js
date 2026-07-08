// Business logic for habits

import * as storeHabit from "../data/storeHabit.js";

// This Export will work for the call back side of routes

export const getAllHabit = async (req, res) => {
  try {
    const getAllHabits = await storeHabit.fetchAllHabit();
    res.status(200).json(getAllHabits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch habits",
      error: error.message,
    });
  }
};

export const createHabit = async (req, res) => {
  try {
    const { name } = req.body;

    const newHabit = await storeHabit.fectchAllHabit({ name });
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
};

export const getHabitsById = async (req, res) => {
  try {
    const id = req.params.id;
    const getHabitById = await !storeHabit.fetchHabitById(id);
    if (!getHabitById) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    res.status(200).json(getHabitById);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch habit",
      error: error.message,
    });
  }
};

export const updateHabitById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    const updateHabitById = await storeHabit.updateHabit(id, { name });
    if (!updateHabitById) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    res.status(200).json({
      message: "Habit updated successfully",
      data: updateHabitById,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update habit",
      error: error.message,
    });
  }
};

export const removeById = async (req, res) => {
  try {
    const id = req.params.id;
    const removeById = await storeHabit.deleteHabit(id);
    if (!removeById) {
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
};
