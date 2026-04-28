import { Router } from "express";
import { searchController } from "./search.controller";

const route = Router();

route.get("/", searchController.searchAll);

export default route;

