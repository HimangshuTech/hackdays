import { Router } from 'express';
import { PostController } from './post.controller';
import { upload } from '../../middleware/multer.middleware';
import { authMiddleware } from '../../middleware/auth.middleware';

const route = Router()

route.post("/create", authMiddleware, upload.array("Images", 5), PostController.uploadPost)


export default route;
