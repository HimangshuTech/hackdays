import jwt from "jsonwebtoken";

const SECRET = "your_secret_key";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.userType
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};