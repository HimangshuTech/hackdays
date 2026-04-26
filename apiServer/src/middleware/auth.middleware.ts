import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded: string | JwtPayload = verifyToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
