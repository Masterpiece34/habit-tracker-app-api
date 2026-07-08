import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Get the directory name of the current module to construct file paths reliably
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We'll store our habits in a local JSON file to act as our "database"
const DATA_FILE = path.join(__dirname, "habit.json");

// Helper to grab the current list of habits from the JSON file
async function readHabitFile() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    // If the file doesn't exist yet, return an empty array
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

// Helper to save the updated list of habits back to the JSON file
// We use JSON.stringify with a formatting indent of 2 spaces so it's readable
async function writeHabits(habits) {
  await fs.writeFile(DATA_FILE, JSON.stringify(habits, null, 2), "utf-8");
}

// Get all habits
export async function fetchAllHabits() {
  return await readHabitFile();
}

// Find a specific habit by its ID
export async function fetchHabitById(id) {
  const habits = await readHabitFile();
  return habits.find((habit) => habit.id === id);
}

// Create a new habit with some default fallbacks
export async function createHabit({
  name = "",
  description = "",
  frequency = "daily",
}) {
  const habits = await readHabitFile();
  
  // Construct the new habit object
  const newHabit = {
    id: crypto.randomUUID(), // Generate a unique ID
    name,
    description,
    frequency,
    checkIns: [], // Array to store YYYY-MM-DD strings
    currentStreak: 0,
    longestStreak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  habits.push(newHabit);
  await writeHabits(habits);
  
  return newHabit;
}

// Update an existing habit by ID
export async function updateHabit(id, updateInfo) {
  const habits = await readHabitFile();
  const habit = habits.find((habit) => habit.id === id);
  
  // If the habit doesn't exist, just bail out
  if (!habit) return null;

  // Destructure the info we might want to update
  const { name, description, frequency } = updateInfo;
  
  // Only update fields that were actually provided in the request
  if (name !== undefined) habit.name = name;
  if (description !== undefined) habit.description = description;
  if (frequency !== undefined) habit.frequency = frequency;
  
  // Always bump the updatedAt timestamp
  habit.updatedAt = new Date().toISOString();

  await writeHabits(habits);
  return habit;
}

// Delete a habit by ID
export async function deleteHabit(id) {
  const habits = await readHabitFile();
  
  // Find where the habit lives in our array
  const index = habits.findIndex((habit) => habit.id === id);
  
  // If we couldn't find it, return false so the route knows it failed
  if (index === -1) return false;

  // Remove the habit from the array and save the changes
  habits.splice(index, 1);
  await writeHabits(habits);
  
  return true;
}

// Calculate streaks from a sorted array of date strings
function calculateStreaks(checkIns) {
  if (!checkIns || checkIns.length === 0) return { current: 0, longest: 0 };
  
  const sortedDates = [...checkIns].sort();
  let currentStreak = 1;
  let longestStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);
    
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }
  
  return { current: currentStreak, longest: longestStreak };
}

// Record a check-in for a specific date and recalculate streaks
export async function checkInHabit(id, date) {
  const habits = await readHabitFile();
  const habit = habits.find((h) => h.id === id);
  
  if (!habit) return null;
  
  // Initialize checkIns array if it doesn't exist (for backward compatibility)
  if (!habit.checkIns) habit.checkIns = [];
  
  // If we already checked in on this date, just ignore and return the habit
  if (habit.checkIns.includes(date)) {
    return habit;
  }
  
  // Add the new date and sort chronologically
  habit.checkIns.push(date);
  habit.checkIns.sort();
  
  // Recalculate the streaks
  const streaks = calculateStreaks(habit.checkIns);
  habit.currentStreak = streaks.current;
  habit.longestStreak = streaks.longest;
  
  habit.updatedAt = new Date().toISOString();
  
  await writeHabits(habits);
  return habit;
}
