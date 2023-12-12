// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.secretKey; // Replace with your actual secret key

const authenticate = (req, res, next) => {
  // Extract the token from the request header, query string, or cookies
  const token = req.header('Authorization');
  if (!token) {
    // If no token is provided, send a 401 Unauthorized response
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, send a 401 Unauthorized response
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticate ;
