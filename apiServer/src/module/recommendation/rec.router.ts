import { Router } from 'express';
import { recController } from './rec.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const route = Router()

route.post("/", authMiddleware, recController.getRec)


export default route;
