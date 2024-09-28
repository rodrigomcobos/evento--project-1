// Auth middleware function to check if the user is authenticated or not
export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
