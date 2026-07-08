// Middleware to validate the payload when creating a new habit
export function validateCreateHabit(req, res, next) {
  const errors = [];
  const { name, description } = req.body;

  // Every habit needs a name, so we strictly check for it here
  if (name === undefined || name === null || String(name).trim() === "") {
    errors.push("name is required and cannot be empty.");
  } else if (typeof name !== "string") {
    errors.push("name must be a string.");
  }

  // The description is optional, but if provided, it better be a string!
  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string.");
  }

  // If we found any issues, halt the request and return a 400 Bad Request
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  // All good! Move on to the actual controller logic
  next();
}

// Middleware to validate the payload when updating an existing habit
export function validateUpdateHabit(req, res, next) {
  const errors = [];
  const { name, description } = req.body;

  // We don't want to process an empty update request
  if (Object.keys(req.body).length === 0) {
    errors.push("Request body cannot be empty.");
  }

  // Name is optional during an update, but if they send it, it can't be blank
  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    errors.push("name must be a non-empty string.");
  }

  // Same rule for description
  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string.");
  }

  // Return any errors we accumulated
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  next();
}

// Middleware to validate a check-in payload
export function validateCheckIn(req, res, next) {
  const errors = [];
  const { date } = req.body;

  // Make sure the date looks like a real calendar date (YYYY-MM-DD)
  if (date !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push("date must be a valid calendar date in YYYY-MM-DD format.");
    }
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  next();
}
