import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATA_FILE = path.join(__dirname, "habit.json");

function readHabitFile() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeHabits(habits) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(habits, null, 2), "utf-8");
}

export function fectchAllHabit() {
  return readHabits();
}

export function fetchHabitById(id) {
  return readHabitFile().find((habit) => habit.id === id);
}

export function createHabit({
  name = "",
  description = "",
  frequency = "daily",
}) {
  const habits = readHabitFile();
  const newHabit = {
    id: crypto.randomUUID(),
    name,
    description,
    frequency,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  habits.push(newHabit);
  writeHabits(habits);
  return newHabit;
}

export function updateHabit(id, updateInfo) {
  const habits = readHabitFile();
  const habit = habits.find((habit) => habit.id === id);
  if (!habit) return null;

  const { name, description, frequency } = updateInfo;
  if (name !== undefined) habit.name = name;
  if (description !== undefined) habit.description = description;
  if (frequency !== undefined) habit.frequency = frequency;
  habit.updatedAt = new Date().toISOString();

  writeHabits(habits);
  return habit;
}

export function deleteHabit(id) {
  const habits = readHabitFile();
  const index = habits.findIndex((habit) => habit.id === id);
  if (index === -1) return false;

  habits.splice(index, 1);
  writeHabits(habits);
  return true;
}
