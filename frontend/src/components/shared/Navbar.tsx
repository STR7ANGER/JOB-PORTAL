import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setUser } from "@/store/authSlice";
import axios from "axios";
import { API_URL } from "@/utils/constant";
import { toast } from "sonner";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(setUser(null));
    try {
      const res = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/10 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <button
          type="button"
          className="flex items-center gap-1.5 text-left"
          onClick={() => navigate("/")}
        >
          <div className="ml-8">
            <p className="text-sm font-semibold tracking-tight text-black">
              JobPortal
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
              Focused job search
            </p>
          </div>
        </button>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-5 text-sm font-medium text-black/65 md:flex">
            <Link
              to="/"
              className="transition hover:text-black hover:underline hover:underline-offset-4"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="transition hover:text-black hover:underline hover:underline-offset-4"
            >
              Jobs
            </Link>
            <Link
              to="/browse"
              className="transition hover:text-black hover:underline hover:underline-offset-4"
            >
              Browse
            </Link>
          </nav>

          {!user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-9 rounded-xl border-black/25 bg-white px-4 text-xs font-medium text-black hover:border-black hover:bg-black hover:text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="h-9 rounded-xl border border-black bg-black px-4 text-xs font-medium text-white transition hover:bg-white hover:text-black"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border border-black/10 transition hover:border-black/40">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@user"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-black/10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-black">
                      {user?.fullname}
                    </h4>
                    <p className="mt-0.5 truncate text-[11px] text-black/55">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="my-3 h-px bg-black/5" />

                <div className="space-y-1.5 text-sm text-black/80">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition hover:bg-black/5"
                    onClick={() => navigate("/profile")}
                  >
                    <span className="flex items-center gap-2">
                      <User2Icon className="h-4 w-4" />
                      <span>View profile</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-red-600 transition hover:bg-red-50"
                    onClick={logoutHandler}
                  >
                    <span className="flex items-center gap-2">
                      <LogOutIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
