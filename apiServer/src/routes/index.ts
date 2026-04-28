import { Router } from 'express';
import authRouter from '../module/auth/auth.route';
import postRouter from '../module/post/post.router'
import searchRouter from '../module/search/search.router'

const router = Router();

router.use("/auth", authRouter)
router.use("/post", postRouter)
router.use("/search", searchRouter)

export default router;
