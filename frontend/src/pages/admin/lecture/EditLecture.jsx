import { ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { id } = useParams();

  return (
    <div className=" items-center justify-between mb-5 text-white">
      <div className="flex items-center gap-2 ml-20">
        <Link to={`/admin/courses/${id}/lectures`}>
          <button className="p-2 m-2 hover:bg-zinc-700 rounded">
            <ArrowLeft className="cursor-pointer" size={18} />
          </button>
        </Link>

        <h1 className="text-lg text-white  font-semibold">Go back</h1>
      </div>
      <div className="mr-10 flex flex-col-reverse mt-10 ml-5">
       <LectureTab/>
      </div>
     
    </div>
  );
};

export default EditLecture;
