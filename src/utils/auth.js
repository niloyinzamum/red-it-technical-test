require('dotenv').config();
const JWT_SECRET = process.env.JWT_SAMPLE;

console.log(JWT_SECRET);

const authenticate = (token) => {
  console.log(token);
  if (!token) {
    throw new Error('Authentication token required');
  }

  try {
    if (token === JWT_SECRET) {
      const decoded = { userId: 'admin', username: 'admin' };
      return decoded;
    } else {
      throw new Error('Invalid or expired token');
    }
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { authenticate };