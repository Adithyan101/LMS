import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getAllCreatorCourses, editCourses, getCourseById, createLecture, getAllLectures } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getAllCreatorCourses)
router.route("/:id").put(isAuthenticated,upload.single("courseThumbnail"),editCourses)
router.route("/:id").get(isAuthenticated,getCourseById)
router.route("/:id/lecture").post(isAuthenticated,createLecture)
router.route("/:id/lecture").get(isAuthenticated,getAllLectures)




export default router;