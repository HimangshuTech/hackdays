import { Router } from 'express';
import { PostController } from './post.controller';
import { upload } from '../../middleware/multer.middleware';
import { authMiddleware } from '../../middleware/auth.middleware';

const route = Router()

route.post("/create", authMiddleware, upload.array("Images", 5), PostController.uploadPost)
route.get("/getPost", authMiddleware, PostController.getAllPost)
route.get("/getPost/:id", authMiddleware, PostController.getPostById)
route.get("/getAllPost", PostController.getAll)


export default route;
