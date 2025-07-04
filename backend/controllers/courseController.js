import Course from "../models/courseModels.js";
import { deleteMedia, uploadMedia } from "../utils/claudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category, price } = req.body;
    console.log(req.body);
    if (!courseTitle || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
      coursePrice: price,
    });
    res.status(200).json({
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "create course server error" });
  }
};

export const getAllCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "Courses not found" });
    }
    res.status(200).json({
      courses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "get all courses server error" });
  }
};

export const editCourses = async (req, res) => {
  try {
    const { courseTitle, category, coursePrice, subTitle, courseLevel, description } = req.body;
    console.log(req.body);
    const thumbnail = req.file;
    if (!courseTitle || !category || !coursePrice || !subTitle || !courseLevel || !description || !courseThumbnail) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let courseThumbnail;
    if (thumbnail) {
     if(course.courseThumbnail){
      const publicId = course.courseThumbnail.split("/").pop().split(".")[0]; //extracting the public id
      await deleteMedia(publicId);
     }
      const cloudResponse = await uploadMedia(thumbnail.path);
    //   courseThumbnail = cloudResponse.secure_url;
    }

    course.courseTitle = courseTitle;
    course.category = category;
    course.coursePrice = coursePrice;
    course.subTitle = subTitle;
    course.courseLevel = courseLevel;
    course.description = description;
    course.courseThumbnail = courseThumbnail?.secure_url;
    await course.save();
    res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "edit course server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {




  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "update course server error" });
  }
};
