import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const isLoading = false;
  const enrolledCourses = [1, 2, 3]; // Replace with dynamic data if needed

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Section */}
        <div>
          <h1 className="text-3xl font-bold text-center md:text-left mb-6">Profile</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>

            <div className="w-full md:w-2/3 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-zinc-800 text-white border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-zinc-800 text-white border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="bg-zinc-800 text-white border-zinc-600"
                />
              </div>

              <Button className="bg-gray-200 text-black hover:bg-zinc-500 transition">
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Update"}
              </Button>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Enrolled Courses
          </h2>

          {enrolledCourses.length === 0 ? (
            <p className="text-white/50 text-center">You haven't enrolled in any course yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {enrolledCourses.map((course, index) => (
                <Course key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Heading */}
        <div>
          <Skeleton className="h-8 w-32 mb-6" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <Skeleton className="h-24 w-24 rounded-full" />

            {/* Inputs */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>

        {/* Enrolled Courses Heading */}
        <div>
          <Skeleton className="h-6 w-44 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 space-y-4"
              >
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

