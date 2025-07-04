import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getAllCreatorCourses, editCourses } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(isAuthenticated,createCourse)
router.route("/").get(isAuthenticated,getAllCreatorCourses)
router.route("/:id").put(isAuthenticated,upload.single("courseThumbnail"),editCourses)




export default router;