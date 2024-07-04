import express from 'express'
import { authorizeRoles, isAutheticated } from '../Middleware/auth';
import { getCoursesAnalytics, getOrdersAnalytics, getUsersAnalytics } from '../Controllers/analytics.controller';
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics",isAutheticated,authorizeRoles("admin"),getUsersAnalytics)
analyticsRouter.get("/get-courses-analytics",isAutheticated,authorizeRoles("admin"),getCoursesAnalytics)
analyticsRouter.get("/get-orders-analytics",isAutheticated,authorizeRoles("admin"),getOrdersAnalytics)

export default analyticsRouter