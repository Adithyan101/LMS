import { Pencil } from "lucide-react"; 

const Lecture = ({ lecture, courseId, index }) => {
  return (
    <div className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 flex items-center justify-between mb-10 hover:bg-zinc-700 transition">
      <span className="text-white font-medium">
        Lecture - {index + 1} : {lecture.lectureTitle}
      </span>

      <button
        title="Edit Lecture"
        className="text-zinc-400 hover:text-white transition"
        onClick={() => {
          // handle edit here
        }}
      >
        <Pencil size={16} />
      </button>
    </div>
  );
};

export default Lecture;
