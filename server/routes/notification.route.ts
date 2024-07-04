import  express from "express";
import { authorizeRoles, isAutheticated } from "../Middleware/auth";
import { getNotifications, updateNotification } from "../Controllers/notifcation.controller";
const notificationRoute = express.Router()

notificationRoute.get("/get-all-notifications",isAutheticated,authorizeRoles("admin"), getNotifications)
notificationRoute.put("/update-notifications/:id",isAutheticated,authorizeRoles("admin"), updateNotification)


export default notificationRoute