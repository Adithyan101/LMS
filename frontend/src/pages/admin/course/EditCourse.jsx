import { useEffect, useState } from "react";
import RichTextEditor from "../../../components/ui/RichTextEditor";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "../../../app/api/courseApi";
import { Link } from "react-router-dom";

const courseLevels = ["Beginner", "Intermediate", "Advanced"];
const categories = ["Frontend", "Backend", "Fullstack", "DevOps"];

const EditCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;

  const { data: courseByIdData, isLoading: courseLoading } =
    useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setFormData({
        title: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: course.courseThumbnail,
      });
      setPreviewUrl(course.courseThumbnail);
    }
  }, [courseByIdData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "courseThumbnail" && files?.[0]) {
      const file = files[0];
      setFormData({ ...formData, courseThumbnail: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("subTitle", formData.subTitle);
    formPayload.append("description", formData.description);
    formPayload.append("category", formData.category);
    formPayload.append("courseLevel", formData.courseLevel);
    formPayload.append("coursePrice", formData.coursePrice);
    formPayload.append("courseThumbnail", formData.courseThumbnail);
    formPayload.append("id", courseId);

    await editCourse({ id: courseId, data: formPayload });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      navigate("/admin/courses");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, navigate]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4 py-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end p-1 mr-4">
        <button onClick={() => navigate(`/admin/courses/${courseId}/lectures`)} className="mt-4 px-4 py-2 text-gray-200 bg-zinc-900 hover:underline rounded transition-all duration-200">
          Go to lectures page
        </button>
      </div>
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4 py-10">
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl border border-zinc-700">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-zinc-300 text-center border-b pb-3 border-zinc-700">
            Edit Course Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Course Title */}
            <div>
              <label className="block mb-1 text-zinc-300">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-md bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                placeholder="Enter course title"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block mb-1 text-zinc-300">Subtitle</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-md bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                placeholder="e.g. Become a MERN stack developer"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 text-zinc-300">Description</label>
              <RichTextEditor input={formData} setInput={setFormData} />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block mb-1 text-zinc-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-md bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Level Dropdown */}
            <div>
              <label className="block mb-1 text-zinc-300">Course Level</label>
              <select
                name="courseLevel"
                value={formData.courseLevel}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 rounded-md bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <option value="">Select level</option>
                {courseLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Price Dropdown */}
            <div>
              <label className="block mb-1 text-zinc-300">
                Course Price($)
              </label>
              <input
                type="text"
                name="coursePrice"
                value={formData.coursePrice}
                onChange={handleChange}
                placeholder="Enter course price"
                className="w-full p-2 sm:p-3 rounded-md bg-zinc-900 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              ></input>
            </div>

            {/* Course Thumbnail */}
            <div>
              <label className="block mb-1 text-zinc-300">
                Course Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                name="courseThumbnail"
                onChange={handleChange}
                className="block w-full text-sm text-zinc-400 
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-zinc-700 file:text-white
               hover:file:bg-zinc-600
               focus:outline-none"
              />

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-zinc-400 text-sm mb-2">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Thumbnail Preview"
                    className="rounded-md border border-zinc-600 max-w-xs h-auto"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => navigate("/admin/courses")}
                className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-600 rounded-md hover:bg-zinc-700 transition duration-200"
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 text-white bg-zinc-700 rounded-md transition duration-200 ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-zinc-800 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Updating...
                  </>
                ) : (
                  "Update Course"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
