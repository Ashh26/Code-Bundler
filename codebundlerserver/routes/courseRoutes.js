import express  from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

//get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - admin only,
router.route("/createcourse").post(isAuthenticated, authorizeAdmin,singleUpload,createCourse);

// Get and Add course lectures
router.route("/course/:id").get(isAuthenticated,authorizeSubscribers,getCourseLectures).post(isAuthenticated,authorizeAdmin,singleUpload,addLecture).delete(isAuthenticated,authorizeAdmin,deleteCourse);

//Delete lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin,deleteLecture);


export default router;