import { Router } from 'express';

import authcontroller from "../auth/auth.controller"

const route = Router()

route.post("/signup",authcontroller.signup)

route.post("/login",authcontroller.login)
export default route;