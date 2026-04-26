import jwt from "jsonwebtoken";
import "dotenv/config";
//import { usertype } from "../../prisma/generated/enums"; //not needed

const SECRET = process.env.JWT_SECRECT_KEY;
type User = {
  id: string;
  name: string;
  email: string;
  usertype: string;
}

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      usertype: user.usertype
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
