import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";

const CourseContainer = () => {
  const isLoading = false;

  const courses = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-zinc-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(6)].map((_, index) => <CourseSkeleton key={index} />)
            : courses.map((course, index) => <Course key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;

const CourseSkeleton = () => {
  return (
    <div className="bg-zinc-800 rounded-2xl p-4 shadow-md border border-zinc-700 space-y-4 overflow-hidden">
      <Skeleton className="h-40 w-full rounded-xl bg-zinc-700" />
      <Skeleton className="h-6 w-3/4 rounded bg-zinc-700" />
      <Skeleton className="h-4 w-1/2 rounded bg-zinc-700" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20 rounded bg-zinc-700" />
        <Skeleton className="h-10 w-20 rounded bg-zinc-700" />
      </div>
    </div>
  );
};
