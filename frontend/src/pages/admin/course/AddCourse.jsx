import  {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "../../../app/api/courseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

    const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createCourse({
        courseTitle,
        category,
        description,
        price,
      }).unwrap();
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong in adding course"
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
    toast.success("Course added successfully");
    navigate("/admin/courses")

    }
  }, [isSuccess, navigate]);

  return (
    <div className="text-white  max-w-xl mx-auto mt-10 p-6 rounded-lg bg-[#1c1c1e] shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-white p-1">Title</Label>
          <Input
            type="text"
            placeholder="React Basics"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>

        <div>
          <Label className="text-white p-1">Description</Label>
          <textarea
            className="w-full bg-[#1f1f1f] text-white border  rounded-lg p-2 mt-1 "
            placeholder="Enter course description..."
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <Label className="text-white p-1">Category</Label>
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="w-full text-white bg-[#1f1f1f] border border-gray-700">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f1f] text-white border border-gray-700">
              <SelectItem
                value="Frontend"
                className="hover:bg-[#2d2d2d] text-white cursor-pointer rounded-md px-2 py-1"
              >
                Frontend
              </SelectItem>
              <SelectItem
                value="Backend"
                className="hover:bg-[#2d2d2d] text-white cursor-pointer rounded-md px-2 py-1"
              >
                Backend
              </SelectItem>
              <SelectItem
                value="Fullstack"
                className="hover:bg-[#2d2d2d] text-white cursor-pointer rounded-md px-2 py-1"
              >
                Fullstack
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white p-1">Price ($)</Label>
          <Input
            type="number"
            placeholder="49"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer hover:bg-zinc-900 w-full mt-4 bg-zinc-800"
        >
          Create Course
        </Button>
      </form>
    </div>
  );
};

export default AddCourse;
