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
