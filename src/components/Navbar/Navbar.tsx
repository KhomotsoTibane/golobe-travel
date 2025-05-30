import { useState } from "react";
import { NavbarLinks } from "@/constants";
import Logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteContext,
  useRouterState,
} from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "aws-amplify/auth";
import { cn } from "@/lib/utils";

interface NavProps {
  textWhite?: boolean;
}

const Navbar = ({ textWhite }: NavProps) => {
  function toQueryString(search: Record<string, any>) {
    const params = new URLSearchParams();
    for (const key in search) {
      const value = search[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    }
    return params.toString() ? `?${params.toString()}` : "";
  }
  const { data } = useQuery(userQueryOptions);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({
    select: (state) => `${state.location.pathname}${toQueryString(state.location.search)}`,
  });
  console.log("data", data);

  const handleLogout = async () => {
    sessionStorage.setItem("returnAfterLogout", location.pathname);
    await signOut();
    const returnTo = sessionStorage.getItem("returnAfterLogout") || "/";
    sessionStorage.removeItem("returnAfterLogout");
    queryClient.invalidateQueries({ queryKey: ["get-current-user"] });
    navigate({ to: returnTo });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full card-shadow bg-white">
      <nav
        className={cn(
          "mx-auto flex items-center justify-between max-w-screen-2xl px-4 py-4",
          textWhite ? "bg-transparent text-white" : "bg-white"
        )}
      >
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8 items-center">
          {NavbarLinks.map((item) => {
            const isActive = pathname.includes(item.link);
            return (
              <div key={item.link} className="relative">
                <Button asChild variant="link" className="text-black">
                  <Link to={item.link} className="flex items-center gap-1 hover:no-underline">
                    <img
                      src={item.imageUrlDark}
                      width={24}
                      height={24}
                      alt={`${item.label}-icon`}
                    />
                    <p>{item.label}</p>
                  </Link>
                </Button>
                {isActive && (
                  <span className="absolute left-0 -bottom-2 h-1 w-full bg-primary-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={Logo} width={100} height={100} alt="logo" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {data ? (
            <>
              <Link
                to="/favorites"
                onClick={() => sessionStorage.setItem("returnToAuthRoute", "/favorites")}
              >
                <Button variant="ghost">
                  <Heart fill={textWhite ? "#fff" : "#000"} className="w-6 h-6 cursor-pointer" />
                  <small>Favorites</small>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback className="bg-primary-600" />
                  </Avatar>
                  <small>{data?.userDetails.fullName}</small>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem>
                    <Link
                      to="/profile"
                      onClick={() => sessionStorage.setItem("returnToAuthRoute", "/profile")}
                    >
                      Manage Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="link">
                <Link to={`/login`} onClick={() => sessionStorage.setItem("returnTo", pathname)}>
                  Login
                </Link>
              </Button>
              <Button asChild variant="link" className="bg-white text-black">
                <Link to={`/login`} onClick={() => sessionStorage.setItem("returnTo", pathname)}>
                  Sign up
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-6 space-y-4">
          {NavbarLinks.map((item) => (
            <Link key={item.link} to={item.link} className="block text-black">
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            {data ? (
              <>
                <Link to="/favorites" className="block mb-2">
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  onClick={() => sessionStorage.setItem("returnToAuthRoute", "/profile")}
                  className="block mb-2"
                >
                  Manage Profile
                </Link>
                <button onClick={handleLogout} className="text-left w-full text-red-500">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/profile" className="block mb-2">
                  Login
                </Link>
                <Link to="/profile" className="block">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
