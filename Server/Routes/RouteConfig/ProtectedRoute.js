const jwt = require("jsonwebtoken");
const { key } = require("../../Constants/RouteConstants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, key, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    req.user = payload;
    next();
  });
};
