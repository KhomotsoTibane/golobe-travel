// import { NavbarLinks } from "@/constants";
// import Logo from "@/assets/images/logo.png";
// import { Button } from "../ui/button";
// import { Link, useRouterState } from "@tanstack/react-router";
// import { userQueryOptions } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { Heart } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { signOut } from "aws-amplify/auth";
// import { cn } from "@/lib/utils";

// interface NavProps {
//   textWhite?: boolean;
// }

// const Navbar = ({ textWhite }: NavProps) => {
//   const { data } = useQuery(userQueryOptions);
//   console.log("user", data);
//   const pathname = useRouterState({
//     select: (state) => state.location.pathname,
//   });

//   console.log("path", pathname);
//   const handleLogout = async () => {
//     await signOut();
//   };
//   return (
//     // <div className="relative h-20 card-shadow w-screen">
//     <div className="fixed top-0 left-0 z-50 w-full card-shadow bg-white">
//       {/* <nav
//         className={` absolute inset-0   max-w-screen-2xl  ${textWhite ? "bg-transparent text-white" : "bg-white"} flex-between z-50 w-full gap-5 px-8  py-6 mx-auto`}
//       > */}
//       <nav
//         className={`mx-auto flex-between w-full max-w-screen-2xl px-8 py-6 ${textWhite ? "bg-transparent text-white" : "bg-white"}`}
//       >
//         <div className="grid grid-cols-3 lg:gap-72">
//           <div className="col-span-1 flex  items-center justify-center lg:gap-8">
//             {NavbarLinks.map((item) => {
//               const isActive = pathname.includes(item.link);

//               return (
//                 <div key={item.link} className="relative">
//                   <Button asChild variant={"link"} className={cn("text-black")}>
//                     <Link
//                       to={item.link}
//                       className={`flex w-full items-center justify-center gap-1`}
//                     >
//                       <img
//                         src={item.imageUrlDark}
//                         width={24}
//                         height={24}
//                         alt={`${item.label}-icon`}
//                       />
//                       <p>{item.label}</p>
//                     </Link>
//                   </Button>

//                   {isActive && (
//                     <span className="absolute left-0 -bottom-2 h-1 w-full bg-primary-400" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//           <div className="col-span-1 flex items-center justify-center">
//             <img src={Logo} width={100} height={100} alt="logo" className="col-span-1" />
//           </div>

//           <div className="flex justify-end items-center gap-5">
//             {data ? (
//               <>
//                 <div
//                   className={`${textWhite ? "text-white" : "text-black"} relative hidden md:flex gap-1 items-center `}
//                 >
//                   <Link to={"/favorites"}>
//                     <Button variant={"ghost"} className="border-primary-400">
//                       <Heart
//                         fill={`${textWhite ? "#fff" : "#000"}`}
//                         className="w-6 h-6 cursor-pointer"
//                       />
//                       <small>Favorites</small>
//                     </Button>
//                   </Link>
//                 </div>

//                 <DropdownMenu>
//                   <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
//                     <Avatar>
//                       {/* <AvatarImage src={authUser.userInfo?.image} /> */}
//                       <AvatarFallback className="bg-primary-600">
//                         {/* {authUser.userRole?.[0].toUpperCase()} */}
//                       </AvatarFallback>
//                     </Avatar>
//                     <small
//                       className={`${textWhite ? "text-white" : "text-black"}  hidden md:block`}
//                     >
//                       {data?.userDetails.fullName}
//                     </small>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="bg-white text-primary-700">
//                     <DropdownMenuItem className="hover:!bg-primary-700 hover:!text-primary-100 font-bold">
//                       <Link to="/profile">Manage Profile</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator className="bg-primary-200" />
//                     <DropdownMenuItem className="hover:!bg-primary-700 hover:!text-primary-100">
//                       Settings
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       className="hover:!bg-primary-700 hover:!text-primary-100"
//                       onClick={handleLogout}
//                     >
//                       Sign out
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <>
//                 <Button asChild variant="link">
//                   <Link to="/profile">Login</Link>
//                 </Button>
//                 <Button asChild variant="link" className="bg-white text-black">
//                   <Link to="/profile">Sign up</Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { NavbarLinks } from "@/constants";
import Logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
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
  const { data } = useQuery(userQueryOptions);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => await signOut();

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
                  <Link to={item.link} className="flex items-center gap-1">
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
          <img src={Logo} width={100} height={100} alt="logo" />
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
              <Link to="/favorites">
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
                    <Link to="/profile">Manage Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-200" />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="link">
                <Link to="/profile">Login</Link>
              </Button>
              <Button asChild variant="link" className="bg-white text-black">
                <Link to="/profile">Sign up</Link>
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
                <Link to="/profile" className="block mb-2">
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
