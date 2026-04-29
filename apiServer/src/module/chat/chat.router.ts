import { Router } from 'express';
import { ChatController } from './chat.controller';

const route = Router()

route.post("/", ChatController.chat)

export default route;
