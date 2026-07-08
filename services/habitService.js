// Business logic layer for habits
// This separates our routing logic from our data access logic,
// making the app easier to test and maintain!

import * as storeHabit from "../data/storeHabit.js";

// Fetch all habits from the data store
export const getAllHabits = async () => {
  return storeHabit.fetchAllHabits();
};

// Fetch a single habit by its unique ID
export const getHabitById = async (id) => {
  return storeHabit.fetchHabitById(id);
};

// Pass the new habit data down to the store to be saved
export const createHabit = async (data) => {
  return storeHabit.createHabit(data);
};

// Update an existing habit with new info
export const updateHabit = async (id, data) => {
  return storeHabit.updateHabit(id, data);
};

// Remove a habit from the store entirely
export const deleteHabit = async (id) => {
  return storeHabit.deleteHabit(id);
};

// Check-in a habit for a specific date
export const checkInHabit = async (id, date) => {
  return storeHabit.checkInHabit(id, date);
};
