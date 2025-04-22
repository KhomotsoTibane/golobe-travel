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
import { Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  return (
    <div className="relative h-20 card-shadow w-screen">
      <nav
        className={` absolute inset-0   max-w-screen-2xl  ${textWhite ? "bg-transparent text-white" : "bg-white"} flex-between z-50 w-full gap-5 px-8  py-6 mx-auto`}
      >
        <div className="grid grid-cols-3 lg:gap-72">
          <div className="col-span-1 flex  items-center justify-center lg:gap-8">
            {NavbarLinks.map((item) => {
              const isActive = pathname.includes(item.link);

              return (
                <div key={item.link} className="relative">
                  <Button asChild variant={"link"} className={cn("text-black")}>
                    <Link
                      to={item.link}
                      className={`flex w-full items-center justify-center gap-1`}
                    >
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
          <div className="col-span-1 flex items-center justify-center">
            <Link to="/">
              <img src={Logo} width={100} height={100} alt="logo" className="col-span-1" />
            </Link>
          </div>

          <div className="flex justify-end items-center gap-5">
            {data ? (
              <>
                <div
                  className={`${textWhite ? "text-white" : "text-black"} relative hidden md:flex gap-1 items-center `}
                >
                  <Link to={"/favorites"}>
                    <Button variant={"ghost"} className="border-primary-400">
                      <Heart
                        fill={`${textWhite ? "#fff" : "#000"}`}
                        className="w-6 h-6 cursor-pointer"
                      />
                      <small>Favorites</small>
                    </Button>
                  </Link>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                    <Avatar>
                      {/* <AvatarImage src={authUser.userInfo?.image} /> */}
                      <AvatarFallback className="bg-primary-600">
                        {/* {authUser.userRole?.[0].toUpperCase()} */}
                      </AvatarFallback>
                    </Avatar>
                    <small
                      className={`${textWhite ? "text-white" : "text-black"}  hidden md:block`}
                    >
                      {data?.userDetails.fullName}
                    </small>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-primary-700">
                    <DropdownMenuItem className="hover:!bg-primary-700 hover:!text-primary-100 font-bold">
                      <Link to="/profile">Manage Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary-200" />
                    <DropdownMenuItem className="hover:!bg-primary-700 hover:!text-primary-100">
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:!bg-primary-700 hover:!text-primary-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </DropdownMenuItem>
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
