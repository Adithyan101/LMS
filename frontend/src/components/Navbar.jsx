import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { authApi, useLoadUserQuery } from "../app/api/authApi";
import { useLogoutUserMutation } from "../app/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../app/feautures/authSlice"; // adjust path if needed

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { user: reduxUser } = useSelector((state) => state.auth);

  // RTK Query (used for page refresh fallback)
  const { data: apiUser, isLoading, isFetching } = useLoadUserQuery();

  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();

  // Prioritize Redux user (after login), fallback to API user (after refresh)
  const user = reduxUser || apiUser;

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(userLoggedOut());
      dispatch(authApi?.util.resetApiState());
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 w-full px-3 py-5 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Menubar */}
        <div className="flex justify-center flex-1 order-2 sm:order-1 py-4">
          <Menubar className="text-white bg-white/5 backdrop-blur-md border border-white/10 w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-2xl shadow-2xl shadow-black/20">
            <MenubarMenu>
              <Link to={"/"}>
                <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                  Home
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link to={"/courses"}>
                <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                  Courses
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <Link to="/about">
                <MenubarTrigger className="text-white hover:bg-white/10 data-[state=open]:bg-white/15 rounded-xl px-4 py-2 transition-all duration-200 font-medium">
                  About
                </MenubarTrigger>
              </Link>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Profile / Login */}
        <div className="order-3 sm:order-2 mt-4 sm:mt-0">
          {isLoading || isFetching ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48 bg-zinc-900 text-white border border-zinc-700"
                align="end"
              >
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Link to="/my-profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                  <Link to="/my-learning">My Learnings</Link>
                </DropdownMenuItem>
                {user.role === "instructor" && (
                  <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-600 text-red-400 hover:text-white cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-zinc-800"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
