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
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../../app/api/authApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";


const Profile = () => {
  const enrolledCourses = [1, 2, 3]; // Replace with dynamic data if needed


  const { data: user, isLoading: loading } = useLoadUserQuery();
  const [updateUser, { isLoading: loadingUpdateUser }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPreviewImage(user.profilePhoto || "https://github.com/shadcn.png");
    }
  }, [user]);

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Section */}
        <div>
          <h1 className="text-3xl font-bold text-center md:text-left mb-6">Profile</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div
                onClick={() => fileInputRef.current.click()}
                className="cursor-pointer relative group"
              >
                <Avatar className="h-24 w-24 ring ring-gray-400 ring-offset-2">
                  <AvatarImage src={user?.photoUrl} alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm rounded-full transition-opacity">
                  Edit
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={onChangeHandler}
                className="hidden"
              />
            </div>

            {/* Form */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-zinc-800 text-gray-300 border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email}
                  readOnly
                  className="bg-zinc-800 text-gray-300 border-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  type="text"
                  value={user?.role}
                  readOnly
                  className="bg-zinc-800 text-gray-300 border-zinc-600"
                />
              </div>

              <Button
                onClick={updateUserHandler}
                className="bg-gray-200 text-black hover:bg-zinc-500 transition"
                disabled={loadingUpdateUser}
              >
                {loadingUpdateUser ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  "Update"
                )}
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
            <p className="text-white/50 text-center">
              You haven't enrolled in any course yet.
            </p>
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

