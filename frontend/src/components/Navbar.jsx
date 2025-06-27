import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;

  return (
    <div className="bg-zinc-900  w-full px-3 py-12">
      <div className="max-w-7xl   mx-auto flex flex-col sm:flex-row items-center justify-between" >
        {/* Centered Menubar */}
        <div className="flex justify-center flex-1 order-2 sm:order-1">
          <Menubar className="text-white bg-white/5 backdrop-blur-md border border-white/10 w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-2xl shadow-2xl shadow-black/20">
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                Home
              </MenubarTrigger>
            </MenubarMenu> 
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                Courses
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                About
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Right Avatar / Login Buttons */}
        <div className="order-3 sm:order-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48 bg-zinc-900 text-white border border-zinc-700"
                align="end"
              >
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Link to='/my-profile'>
                   My Profile
                  </Link>
                 
                </DropdownMenuItem>
                
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Link to='/my-learning'>
                  My Learnings
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="hover:bg-red-600 text-red-400 hover:text-white cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-zinc-800"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-zinc-800"
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


