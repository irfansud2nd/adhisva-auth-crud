import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = {
      name: decoded.name,
      email: decoded.email,
    };
    next();
  });
};

export default verifyJWT;
