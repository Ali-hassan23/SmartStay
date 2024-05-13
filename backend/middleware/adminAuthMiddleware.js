const jwt = require('jsonwebtoken');

function authenticateAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token lessgo:', err.message);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Assuming all logged-in users are admins
    req.user = decoded;
    next();
  });
  };

module.exports = { authenticateAdminToken,verifyAdmin };
