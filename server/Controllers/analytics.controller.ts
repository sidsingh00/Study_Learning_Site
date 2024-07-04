import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../Middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.Model";


// get users analytics -- only for admin

export const getUsersAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await generateLast12MonthsData(userModel)

        res.status(200).json({
            success:true,
            users
        })

    } catch (error:any) {
      return  next(new ErrorHandler(error.message,500))
    }
})


// get Course analytics -- only for admin

export const getCoursesAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const Course = await generateLast12MonthsData(CourseModel)

        res.status(200).json({
            success:true,
            Course
        })

    } catch (error:any) {
      return  next(new ErrorHandler(error.message,500))
    }
})


// get Order analytics -- only for admin

export const getOrdersAnalytics = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
    try {
        const Orders = await generateLast12MonthsData(OrderModel)

        res.status(200).json({
            success:true,
            Orders
        })

    } catch (error:any) {
      return  next(new ErrorHandler(error.message,500))
    }
})