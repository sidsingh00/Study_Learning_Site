import express from 'express'
import { authorizeRoles, isAutheticated } from '../Middleware/auth'
import { createLayout, editLayout, getLayoutByType } from '../Controllers/layout.controller'

const layoutRouter = express.Router()

layoutRouter.post("/create-layout",isAutheticated,authorizeRoles("admin"),createLayout)
layoutRouter.put("/edit-layout",isAutheticated,authorizeRoles("admin"),editLayout)
layoutRouter.get("/get-layout",isAutheticated, getLayoutByType)

export default layoutRouter