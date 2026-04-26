import { Router } from 'express';
import authRouter from '../module/auth/auth.route';
import postRouter from '../module/post/post.router'

const router = Router();

router.use("/auth", authRouter)
router.use("/post", postRouter)

export default router;
