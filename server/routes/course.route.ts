import express from 'express';
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getCourseByUser, getCourses, getSingleCourse, uploadCourse} from '../Controllers/course.controller';
import { authorizeRoles, isAutheticated } from '../Middleware/auth';
const courseRouter = express.Router();

courseRouter.post(
	'/create-course',
	isAutheticated,
	authorizeRoles("admin"),
	uploadCourse
);

courseRouter.put(
	'/edit-course/:id',
	isAutheticated,
	authorizeRoles("admin"),
	editCourse
);

courseRouter.get(
	'/get-course/:id',
	getSingleCourse
);

courseRouter.get(
	'/get-courses',
	getCourses
);

courseRouter.get(
	'/get-course-content/:id',
    isAutheticated,
	getCourseByUser
);

courseRouter.put(
	'/add-question',
    isAutheticated,
	addQuestion
);

courseRouter.put(
	'/add-answer',
    isAutheticated,
	addAnswer
);

courseRouter.put(
	'/add-review/:id',
    isAutheticated,
	addReview
);

courseRouter.put(
	'/add-reply',
    isAutheticated,
    authorizeRoles("admin"),
	addReplyToReview
);

courseRouter.get(
	'/add-all-courses',
    isAutheticated,
    authorizeRoles("admin"),
	getAllCourses
);

courseRouter.delete(
	'/delete-course/:id',
    isAutheticated,
    authorizeRoles("admin"),
	deleteCourse
);

export default courseRouter;
