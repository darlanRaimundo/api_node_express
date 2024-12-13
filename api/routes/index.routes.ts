import { Router } from "express"
import V1Router from "./v1";

export const MainRouter = Router()

MainRouter.use('/api/v1', V1Router)