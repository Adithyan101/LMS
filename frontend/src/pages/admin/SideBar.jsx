import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  Menu, 
  X, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div className={`bg-zinc-900 sticky top-0 z-40 text-white transition-all duration-300 ease-in-out flex flex-col ${
      isExpanded ? 'w-60' : 'w-26'
    } min-h-screen border-r border-gray-800`}>
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Manual Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          
          {/* Home */}
          <li>
            <Link to="/admin/dashboard">
              <button
                onClick={() => setActiveItem('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeItem === 'home' 
                    ? 'bg-zinc-700 text-white shadow-lg border border-zinc-600' 
                    : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <Home size={20} className="flex-shrink-0" />
                {isExpanded && (
                  <>
                    <span className="font-medium">Home</span>
                    <ChevronRight 
                      size={16} 
                      className={`ml-auto transition-transform ${
                        activeItem === 'home' ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} 
                    />
                  </>
                )}
              </button>
            </Link>
          </li>

          {/* Courses */}
          <li>
            <Link to="/admin/courses">
              <button
                onClick={() => setActiveItem('courses')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeItem === 'courses' 
                    ? 'bg-zinc-700 text-white shadow-lg border border-zinc-600' 
                    : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <BookOpen size={20} className="flex-shrink-0" />
                {isExpanded && (
                  <>
                    <span className="font-medium">Courses</span>
                    <ChevronRight 
                      size={16} 
                      className={`ml-auto transition-transform ${
                        activeItem === 'courses' ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} 
                    />
                  </>
                )}
              </button>
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
