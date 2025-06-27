import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Course = () => {
  return (
<Card className="group overflow-hidden rounded-lg bg-zinc-800 text-white border border-zinc-700 shadow-md transition duration-300 hover:shadow-lg hover:border-white/30">
 <div className="relative w-full h-48 overflow-hidden">
  <img
    src="https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75"
    alt="Course"
    className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
  />
</div>

  <div className="p-4 space-y-2">
    <h2 className="text-xl font-semibold">Full Stack Development</h2>
    <p className="text-sm text-white/70">
      Learn MERN stack with real-world projects and practical examples.
    </p>
    <div className="mt-4 flex justify-between items-center">
      <span className="text-sm font-medium text-white/80">12 Weeks</span>
      <Button
        variant="outline"
        className="border-white text-white hover:bg-white/10 transition"
      >
        Enroll
      </Button>
    </div>
  </div>
</Card>

  );
};

export default Course;
