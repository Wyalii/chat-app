import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel } from "../controllers/ChannelControllers.js";

const channelRoutes = Router()

channelRoutes.post("/create-channel",verifyToken,createChannel)


export default channelRoutes;