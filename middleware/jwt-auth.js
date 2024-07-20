require('dotenv').config();
const jwt = require('jsonwebtoken');
mysecrate = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.redirect('/user/login');
    
    try {
      const verified = jwt.verify(token, mysecrate);
      console.log(verified);
      req.user = verified;
      next();
    } catch (error) {
      // console.log(error);
      if (error.name === "TokenExpiredError") {
        console.log("Token has expired, please login again.");
        // Redirect to login or send a specific message about token expiration
        return res.status(401).send("Session expired. Please login again.");
      }
      res.redirect('/user/login');
    }
  };  