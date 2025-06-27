import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourse = [1, 2]; // demo data

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-4xl mx-auto py-10 px-4 md:px-0">
        <h1 className="font-bold text-2xl mb-6">My Learning</h1>

        <div className="my-5">
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearningCourse.length === 0 ? (
            <p className="text-white/50">No course found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {myLearningCourse.map((course, index) => (
                <Course key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;


const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 space-y-4 shadow-sm"
        >
          <Skeleton className="h-40 w-full rounded-lg bg-zinc-700" />
          <Skeleton className="h-6 w-3/4 rounded bg-zinc-700" />
          <Skeleton className="h-4 w-1/2 rounded bg-zinc-700" />
          <div className="flex justify-between mt-2">
            <Skeleton className="h-10 w-24 rounded bg-zinc-700" />
            <Skeleton className="h-10 w-20 rounded bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
   
  );
};