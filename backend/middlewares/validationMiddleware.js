export const validateEvent = (req, res, next) => {
  // Destructure the event object properties from the request body
  const { name, description, date, location, capacity } = req.body;

  // Check if any of the required fields are missing
  if (!name || !description || !date || !location || !capacity) {
    // Return 400 Bad Request with a message indicating which fields are missing
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // If all required fields are present, call the next middleware
  next();
};
