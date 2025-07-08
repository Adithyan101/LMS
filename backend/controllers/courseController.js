import Course from "../models/courseModels.js";
import Lecture from "../models/lectureModel.js";
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
    const { title, category, coursePrice, subTitle, courseLevel, description } =
      req.body;
    const thumbnail = req.file;

    console.log(
      title,
      category,
      coursePrice,
      subTitle,
      courseLevel,
      description,
      thumbnail
    );

    // Validate body (don't validate thumbnail here)
    if (
      !title ||
      !category ||
      !coursePrice ||
      !subTitle ||
      !courseLevel ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let courseThumbnail = course.courseThumbnail; // default to existing thumbnail

    if (thumbnail) {
      // Delete existing thumbnail from cloud
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }

      // Upload new thumbnail
      const cloudResponse = await uploadMedia(thumbnail.path);
      courseThumbnail = cloudResponse.secure_url;
    }

    // Update course fields
    course.courseTitle = title;
    course.category = category;
    course.coursePrice = coursePrice;
    course.subTitle = subTitle;
    course.courseLevel = courseLevel;
    course.description = description;
    course.courseThumbnail = courseThumbnail;

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

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      course,
      message: "Course fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "getCourseById server error" });
  }
};


export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    console.log(req.body);
    const courseId = req.params.id;
    if (!lectureTitle || !courseId)  {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    //create lecture
    const lecture = await Lecture.create({
     title: lectureTitle
    })

    if(course){
      course.lectures.push(lecture._id);
      await course.save();
      res.status(200).json({
        course,
        message: "Lecture created successfully",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "create lecture server error" });
  }
};


export const getAllLectures = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      course,
      message: "Lectures fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "get all lectures server error" });
  }
};


export const editLecture = async(req,res)=>{
  try {
    const { lectureTitle, isPreviewFree } = req.body;
    const lectureId = req.params.id;
    if (!lectureTitle || !lectureId || !isPreviewFree)  {
      return res.status(400).json({ message: "All fields are required" });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "edit lecture server error" });
  }
}


//9.50