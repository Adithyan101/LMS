import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <div className="text-white py-20">
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="flex justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="inline-flex items-center gap-x-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-sm text-white transition-all w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none text-white placeholder-white/60 flex-grow"
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
              >
                <svg
                  className="h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </form>
          </div>

          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Let&apos;s Learn Together
            </h1>
          </div>

          {/* Description */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-white/70 text-xl">
              Over 10,000+ educational content available, Learn, grow, and
              improve your skills with us today.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button
              size="lg"
              className="bg-white text-zinc-900 hover:bg-white/90"
            >
              explore courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
      <div className="w-60 h-px bg-white flex items-center justify-center mx-auto" />
    </>
  );
};

export default HeroSection;
