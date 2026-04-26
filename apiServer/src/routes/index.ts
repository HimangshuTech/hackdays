import { Router } from 'express';
import authRouter from '../auth/auth.route';
import postRouter from '../post/post.router'

const router = Router();

router.use("/auth", authRouter)
router.use("/post", postRouter)

export default router;
