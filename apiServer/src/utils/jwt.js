import jwt from "jsonwebtoken";

const SECRET = "your_secret_key";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};