import { Router } from 'express';
import authController from '../auth/auth.controller';
import authRouter from '../auth/auth.route';
const router = Router();

router.use("/auth",authRouter)

export default router;
