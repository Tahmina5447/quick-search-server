const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// const User = require("../Models/userModel");
/* 
1.chek if token exists
2.if not token send response
3. docode the token
4.if valid token, next 
 */

module.exports = async (req, res, next) => {
  try {
   const authHeader = req.headers?.authorization;
   if (!authHeader) {
     return res.status(401).json({ status: "fail", error: "Unauthorized." });
   }

   const token = authHeader.startsWith("Bearer ")
     ? authHeader.split(" ")[1]
     : authHeader;

    if (!token) {
      return res.status(401).json({ status: "fail", error: "Unauthorized." });
    }
    // jwt.verify(() => {});
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );
    // jodi user er full data drkr hoy tahole aita diye pawa jabe.
    // const user = User.findOne({ email: decoded.email });
    // req.user = user;
    // ekhane verify howyar time a user er sob data find kore pathale o hobe
    req.user = decoded;
    next();
  } catch (error) {


    if (error.name === "TokenExpiredError") {
        // Handle the token expiration case
        return res.status(401).json({
          status: "fail",
          error: "Your token has expired. Please log in again.",
          expiredAt: error.expiredAt, // Optional: Include when the token expired
        });
      }

    res.status(403).json({
      status: "fail",
      error: "Unauthorized.",
    });
  }
};
