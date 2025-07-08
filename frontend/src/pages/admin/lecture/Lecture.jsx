import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  console.log(lecture);

  return (
    <div className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 flex items-center justify-between mb-3 hover:bg-zinc-700 transition">
      <span className="text-zinc-200 text-sm font-light">
        Lecture - {index + 1}:{" "}
        <span className="text-white font-semibold tracking-wide">
          {lecture.title}
        </span>
      </span>

      <button
        title="Edit Lecture"
        className="text-zinc-400 hover:text-blue-500 transition cursor-pointer"
        onClick={() => {
          navigate(`/admin/courses/${courseId}/lectures/${lecture._id}`);
        }}
      >
        <Pencil size={16} />
      </button>
    </div>
  );
};

export default Lecture;
