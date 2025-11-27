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
const Navbar = () => {
  const navigate = useNavigate();
  const user = false;
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
                <Avatar className="h-9 w-9 cursor-pointer border border-black/10">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 rounded-2xl border border-black/10 bg-white shadow-xl">
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9 border border-black/10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium text-black">John Doe</h4>
                    <p className="text-xs text-black/55">
                      lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="my-3 h-px bg-black/5" />
                <div className="flex flex-col gap-2 text-sm text-black/70">
                  <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-black/5"
                  >
                    <User2Icon className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-xl px-1.5 py-1 text-red-600 transition hover:bg-red-50"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    <span>Logout</span>
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
