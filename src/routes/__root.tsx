import Navbar from "@/components/Navbar/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="grid grid-rows-[auto,_1fr] h-full">
      <Navbar textWhite />
      <div className="h-full px-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
