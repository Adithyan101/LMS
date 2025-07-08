import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
const MEDIA_API = "http://localhost:5000/api/v1/media/";

const LectureTab = () => {
  const [isFree, setIsFree] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <Card className="bg-zinc-800 text-white w-full max-w-4xl border-none mx-auto rounded-2xl shadow-lg">
      {/* Header */}
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4">
        <div>
          <CardTitle className="text-xl md:text-2xl font-semibold tracking-wide">
            Update Your Lecture
          </CardTitle>
          <CardDescription className="text-zinc-400 mt-1">
            Make changes and click save when you are done.
          </CardDescription>
        </div>

        <Button
          variant="destructive"
          className="bg-red-700 hover:bg-red-600 cursor-pointer text-white transition"
        >
          Remove Lecture
        </Button>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-6 py-4 border-t border-zinc-700 space-y-6">
        {/* Title Input */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="title" className="text-sm text-zinc-300">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter lecture title"
            className="bg-zinc-700 border border-zinc-600 placeholder:text-zinc-400 text-white focus:ring-1 focus:ring-zinc-500"
          />
        </div>

        {/* Video Upload */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="video" className="text-sm text-zinc-300">
            Video <span className="text-red-500">*</span>
          </Label>

          <div className="relative w-full">
            <input
              id="video"
              type="file"
              accept="video/*"
              className="file-input peer absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            />
            <div className="flex items-center justify-between bg-zinc-700 text-white rounded-md px-4 py-2 border border-zinc-600 peer-focus:ring-1 peer-focus:ring-zinc-500 transition">
              <span className="text-sm text-zinc-400 peer-placeholder-shown:text-zinc-500 truncate max-w-[70%]">
                Choose a video file
              </span>
              <span className="text-sm bg-zinc-600 px-3 py-1 rounded-md font-medium">
                Browse
              </span>
            </div>
          </div>
        </div>

        {/* Is Free Toggle */}
        <div className="flex items-center space-x-3 pt-2">
          <Switch
            id="isFree"
            checked={isFree}
            onCheckedChange={setIsFree}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-zinc-600 transition"
          />
          <Label htmlFor="isFree" className="text-sm text-zinc-300">
            Is this video free?
          </Label>
        </div>
      </CardContent>

      {mediaProgress && (
        <div className="w-full h-2 bg-zinc-700">
          <Progress value={uploadProgress} />
          <p> {uploadProgress}% uploaded</p>
        </div>
      )}

      {/* Footer */}
      <CardFooter className="flex justify-end px-6 py-4 border-t border-zinc-700">
        <Button className="bg-blue-700 cursor-pointer hover:bg-blue-800 text-white transition">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LectureTab;

//10.09
