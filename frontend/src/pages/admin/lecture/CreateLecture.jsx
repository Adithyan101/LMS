import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderIcon, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useCreateLectureMutation,
  useGetAllLecturesQuery,
} from "../../../app/api/courseApi";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const { id } = useParams();

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const { data: lectureData, isLoading: lectureLoading } =
    useGetAllLecturesQuery(id);
  console.log(lectureData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLecture({ id, lectureTitle }).unwrap();
      console.log(data);
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong in adding course"
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lecture created successfully");
      setLectureTitle("");
    }

    if (error) {
      toast.error(
        error?.data?.message || "Something went wrong in adding course"
      );
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-5">
        <div className="w-full max-w-2xl bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-700 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-5 text-center border-b border-zinc-700 pb-3">
            Create New Lecture
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <Label className="text-zinc-300 mb-1 block">Lecture Title</Label>
              <Input
                type="text"
                placeholder="e.g. React Basics"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                className="bg-zinc-800 text-white border border-zinc-600 focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Button Group */}
            <div className="flex justify-between items-center gap-4 pt-4">
              <Button
                type="button"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md transition duration-200"
              >
                ← Back to Course
              </Button>

              <Button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition duration-200"
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Create Lecture"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className=" text-white p-2 mr-1 ">
        {lectureLoading ? (
          <div className=" items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          lectureData?.course?.lectures?.map((lecture, index) => (
            <Lecture className="" index={index} key={lecture._id} courseId={id} lecture={lecture} />
          ))
        )}
      </div>
    </>
  );
};

export default CreateLecture;
///9.10
