// Routes for habits
// Routes for habits


import express from 'express';
import {
getAllHabits,
getHabitById,
createHabit,
updateHabit,
deleteHabit
} from '../services/habitService.js';
const router = express.Router();
/**
•	GET /resources
•	Get all habits
*/
router.get('/resources', async (req, res) => {
try {
const habits = await getAllHabits();
res.status(200).json(habits);
} catch (error) {
res.status(500).json({
message: 'Failed to fetch habits',
error: error.message
});
}
});
/**
•	GET /resources/:id
•	Get a single habit by ID
*/
router.get('/resources/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const habit = await getHabitById(id);
if (!habit) {
return res.status(404).json({
message: 'Habit not found'
});
}
res.status(200).json(habit);
} catch (error) {
res.status(500).json({
message: 'Failed to fetch habit',
error: error.message
});
}
});
/**
•	POST /resources
•	Create a new habit
*/
router.post('/resources', async (req, res) => {
try {
const { name } = req.body;
// Basic validation
// if (!name || name.trim() === '') {
// return res.status(400).json({
// message: 'Name is required'
// });
// }
const newHabit = await createHabit({ name });
res.status(201).json({
message: 'Habit created successfully',
data: newHabit
});
} catch (error) {
res.status(500).json({
message: 'Failed to create habit',
error: error.message
});
}
});
/**
•	PUT /resources/:id
•	Update an existing habit
*/
router.put('/resources/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const { name } = req.body;
if (!name || name.trim() === '') {
return res.status(400).json({
message: 'Name is required'
});
}
const updatedHabit = await updateHabit(id, { name });
if (!updatedHabit) {
return res.status(404).json({
message: 'Habit not found'
});
}
res.status(200).json({
message: 'Habit updated successfully',
data: updatedHabit
});
} catch (error) {
res.status(500).json({
message: 'Failed to update habit',
error: error.message
});
}
});
/**
•	DELETE /resources/:id
•	Delete a habit
*/
router.delete('/resources/:id', async (req, res) => {
try {
const id = Number(req.params.id);
const deleted = await deleteHabit(id);
if (!deleted) {
return res.status(404).json({
message: 'Habit not found'
});
}
res.status(200).json({
message: 'Habit deleted successfully'
});
} catch (error) {
res.status(500).json({
message: 'Failed to delete habit',
error: error.message
});
}
});
export default router;



