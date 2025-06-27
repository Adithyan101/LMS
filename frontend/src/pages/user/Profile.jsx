import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const isLoading = false
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center md:text-left">Profile</h1>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>

          <div className="w-full md:w-2/3 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="bg-zinc-800 text-white border-zinc-600"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-zinc-800 text-white border-zinc-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
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
    </div>
  );
};

export default Profile;
