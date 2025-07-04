import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "../../../app/api/courseApi";

const CourseTable = () => {
  const { data, isLoading, isSuccess } = useGetCreatorCourseQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="p-6 bg-zinc-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Link to="/admin/courses/create">
          <Button className=" cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white">
            <Plus size={16} className="mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-800">
            <TableRow>
              <TableHead className="text-zinc-300">Title</TableHead>
              <TableHead className="text-zinc-300 ">Status</TableHead>
              <TableHead className="text-zinc-300">Category</TableHead>
              <TableHead className="text-zinc-300">Price</TableHead>
              <TableHead className="text-zinc-300 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {data?.courses?.map((course) => (
            <TableBody key={course._id}>
              {/* Row */}
              <TableRow className="hover:bg-zinc-800">
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="">
                  <span className="bg-green-700 text-xs px-2 py-1 rounded">
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>${course.coursePrice}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`${course._id}`)}
                    size="sm"
                    className="text-white border-zinc-600 hover:bg-zinc-700"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
