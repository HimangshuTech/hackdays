import { JwtPayload } from "../utils/jwt"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
