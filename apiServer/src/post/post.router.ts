import { Router } from 'express';
import { PostController } from './post.controller';
import { upload } from '../middleware/multer.middleware';

const route = Router()

route.post("/create", upload.array("postImg", 5), PostController.uploadPost)


export default route;
