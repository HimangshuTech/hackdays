import { Router } from "express";
import { searchController } from "./search.controller";
import { authMiddleware } from '../../middleware/auth.middleware';

const route = Router();

// Public search (you can add authMiddleware if needed)
route.get("/", searchController.searchAll);

export default route;

