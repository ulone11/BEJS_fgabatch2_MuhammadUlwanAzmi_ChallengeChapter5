const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, Authorization denied" });
  }

  try {
    const TOKEN_VALUE = token.split(" ")[1];
    // console.log(TOKEN_VALUE);
    const decoded = jwt.verify(TOKEN_VALUE, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
