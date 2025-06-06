// backend/utils/generatetoken.js
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // el token expira en 30 días
  });
};

export default generateToken;