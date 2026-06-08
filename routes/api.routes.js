import express from "express"
import { requireAuth } from "../middleware/main.js"
import { getPresignedUrl } from "../controllers/api.controller.js"

export const apiRouter = express.Router()

apiRouter.get("/presigned-url", requireAuth, getPresignedUrl)