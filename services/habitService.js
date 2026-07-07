// Business logic for habits

import * as storeHabit from "../data/storeHabit.js";

export const getAllHabit = (req, res) => {
  res.status(200).json(storeHabit.fetchAllHabit());
};

export const getHabitsById = (req, res) => {
  if (!storeHabit.fetchHabitById) {
    return res
      .status(404)
      .json({ success: false, errors: ["Habit not found"] });
  }
  res.status(200).json(storeHabit.fetchHabitById(req.params.id));
};

export const create = (req, res) => {
  res.status(201).json(storeHabit.createHabit(req.body));
};

export const updateHabitById = (req, res) => {
  if (!storeHabit.updateHabit) {
    return res
      .status(404)
      .json({ success: false, errors: ["Habit not found"] });
  }

  res.json(storeHabit.updateHabit(req.params.id, req.body));
};

export const removeById = (req, res) => {
  if (!storeHabit.deleteHabit) {
    return res
      .status(404)
      .json({ success: false, errors: ["Habit not found"] });
  }
  res.json(storeHabit.deleteHabit(req.params.id));
};
