const jwt = require('jsonwebtoken');

// Replace with your actual JWT token string
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGRiOGYwMjQ3YWFlNDI0YzFkYTA1NjIiLCJpYXQiOjE3NTkyMzY4MTQsImV4cCI6MTc1OTI0MDQxNH0.W1UJGu2GQR2oekd74CYLnqneW5jZTgZrKV4tcduAOGo';

try {
  const decoded = jwt.decode(token);
  console.log('User ID from token:', decoded.id || decoded._id);
  console.log('Decoded token:', decoded);
} catch (err) {
  console.error('Invalid token:', err.message);
}
