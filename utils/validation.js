const { isValidDateString, todayDateString } = require('../utils/streaks');

function validateCreateHabit(req, res, next) {
  const errors = [];
  const { name, description } = req.body;

  if (name === undefined || name === null || String(name).trim() === '') {
    errors.push('name is required and cannot be empty.');
  } else if (typeof name !== 'string') {
    errors.push('name must be a string.');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

function validateUpdateHabit(req, res, next) {
  const errors = [];
  const { name, description } = req.body;

  if (Object.keys(req.body).length === 0) {
    errors.push('Request body cannot be empty.');
  }

  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    errors.push('name must be a non-empty string.');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

function validateCheckIn(req, res, next) {
  const errors = [];
  const { date } = req.body;

  if (date !== undefined) {
    if (!isValidDateString(date)) {
      errors.push('date must be a valid calendar date in YYYY-MM-DD format.');
    } else if (date > todayDateString()) {
      errors.push('date cannot be in the future.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}


